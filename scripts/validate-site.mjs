import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const versionPattern = /^\d{4}\.\d{2}\.\d{2}$/;
const errors = [];

const read = (relativePath) => readFile(path.join(root, relativePath), 'utf8');

const collectHtml = async (directory = root) => {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === '.git') continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectHtml(absolutePath)));
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(absolutePath);
  }
  return files;
};

const textContent = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|#160);/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const manifest = JSON.parse(await read('policy-versions.json'));
for (const type of ['privacy', 'terms']) {
  const policy = manifest[type];
  if (!policy || !versionPattern.test(policy.latest)) {
    errors.push(`${type}: latest 버전은 yyyy.mm.dd 형식이어야 합니다.`);
    continue;
  }
  if (!Array.isArray(policy.versions) || policy.versions[0] !== policy.latest) {
    errors.push(`${type}: versions 첫 항목은 latest여야 합니다.`);
    continue;
  }
  if (new Set(policy.versions).size !== policy.versions.length) {
    errors.push(`${type}: 중복 버전이 있습니다.`);
  }
  for (const version of policy.versions) {
    if (!versionPattern.test(version)) {
      errors.push(`${type}: ${version}은 yyyy.mm.dd 형식이 아닙니다.`);
      continue;
    }
    const versionPath = `${type}/versions/${version}.html`;
    let versionHtml;
    try {
      versionHtml = await read(versionPath);
    } catch {
      errors.push(`${versionPath}: 버전 파일이 없습니다.`);
      continue;
    }
    if (!versionHtml.includes(`data-policy-type="${type}"`)) {
      errors.push(`${versionPath}: policy type 표기가 없습니다.`);
    }
    if (!versionHtml.includes(`data-policy-version="${version}"`)) {
      errors.push(`${versionPath}: 버전 표기가 파일명과 다릅니다.`);
    }
  }

  const latestHtml = await read(`${type}/index.html`);
  const snapshotHtml = await read(`${type}/versions/${policy.latest}.html`);
  if (!latestHtml.includes(`data-policy-version="${policy.latest}"`)) {
    errors.push(`${type}/index.html: latest 버전 표기가 manifest와 다릅니다.`);
  }
  if (textContent(latestHtml) !== textContent(snapshotHtml)) {
    errors.push(`${type}: 기본 문서와 latest 고정 버전의 본문 텍스트가 다릅니다.`);
  }
}

for (const absolutePath of await collectHtml()) {
  const relativePath = path.relative(root, absolutePath);
  const html = await readFile(absolutePath, 'utf8');
  if (!html.includes('<html lang="ko">')) errors.push(`${relativePath}: lang="ko"가 없습니다.`);
  if (!html.includes('name="viewport"')) errors.push(`${relativePath}: viewport가 없습니다.`);
  if (!/<title>.+<\/title>/.test(html)) errors.push(`${relativePath}: title이 없습니다.`);
  if (!/<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/.test(html)) errors.push(`${relativePath}: h1이 없습니다.`);

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (/^(?:https?:|mailto:|tel:|#)/.test(href)) continue;
    const pathname = href.split(/[?#]/)[0];
    const resolved = path.resolve(path.dirname(absolutePath), pathname);
    if (!resolved.startsWith(root)) {
      errors.push(`${relativePath}: 사이트 밖을 가리키는 링크 ${href}`);
      continue;
    }
    let target = resolved;
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
      await stat(target);
    } catch {
      errors.push(`${relativePath}: 존재하지 않는 링크 ${href}`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log('Policy versions and site links are valid.');
