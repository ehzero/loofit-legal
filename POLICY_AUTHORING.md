# 루핏 정책 문서 작성·버전 관리 기준

이 문서는 개인정보 처리방침과 이용약관을 일관된 방식으로 작성·배포하기 위한 내부 기준이다. 문서만으로 법적 의무가 모두 충족되는 것은 아니며, 개인정보 처리 흐름이나 비즈니스 모델이 크게 바뀌는 경우 법률 전문가 검토를 거친다.

## 공식 기준

- 개인정보 처리방침은 개인정보보호위원회의 [개인정보 처리방침 작성지침(2026.4.)](https://www.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS217&mCode=D010030000.Updated&nttId=12018)과 [개인정보 보호법 제30조](https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1020398435)를 기준으로 한다.
- 이용약관은 [약관의 규제에 관한 법률 제3조](https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1021562631)의 명시·설명 원칙과 불공정 약관 금지 원칙을 기준으로 한다. 현재 루핏에 직접 적용되는 별도의 업종별 공정거래위원회 표준약관은 사용하지 않는다.
- 계정 삭제 안내는 [Apple 계정 삭제 지침](https://developer.apple.com/kr/support/offering-account-deletion-in-your-app/)과 [Google Play 계정 삭제 요건](https://support.google.com/googleplay/android-developer/answer/13327111?hl=ko)을 함께 확인한다.
- GitHub Pages는 `main` 브랜치 루트를 배포 원본으로 사용한다.

## 작성 원칙

1. 실제 제품과 서버 동작을 먼저 확인하고 문서가 구현보다 앞서거나 뒤처지지 않게 한다.
2. 필수 항목, 해당하는 경우에만 쓰는 항목, 운영상 권장 항목을 구분한다.
3. 수집하지 않는 정보와 로컬 전용 정보도 이용자가 오해하지 않도록 구분해 설명한다.
4. “익명”이라는 표현은 복원이 불가능한 경우에만 사용한다. 서비스 내부에서 계정과 연결할 수 있는 값은 가명 또는 임시 표시명으로 설명한다.
5. 처리 목적, 항목, 법적 근거와 보유기간은 가능한 한 같은 표에서 대응시킨다.
6. 이용자에게 불리한 책임 제한, 일방적 변경 또는 포괄적 동의 조항을 작성하지 않는다.
7. 앱, App Store Connect, Play Console의 개인정보·데이터 보안 답변과 공개 문서를 함께 갱신한다.

## 버전 규칙

- 버전은 시행일과 같은 `yyyy.mm.dd` 형식을 사용한다.
- 최신 문서는 `/privacy/`, `/terms/`에 게시한다.
- 모든 버전의 고정 원문은 `/privacy/versions/yyyy.mm.dd.html`, `/terms/versions/yyyy.mm.dd.html`에 보존한다.
- 발행된 버전 파일은 오탈자까지 포함해 원칙적으로 수정하지 않는다. 실질적 수정은 새 시행일과 새 버전으로 발행한다.
- `/privacy/versions/`, `/terms/versions/`에는 최신순 버전 목록과 주요 변경사항을 적는다.
- `policy-versions.json`의 `latest`와 `versions`를 함께 갱신한다.

## 새 버전 발행 절차

1. 제품 코드, 서버 저장 모델, 외부 SDK, 보유기간과 공개 범위를 점검한다.
2. 최신 기본 문서를 개정하고 새 `data-policy-version`과 시행일을 입력한다.
3. 같은 본문을 새 고정 버전 URL에 저장한다.
4. 이전 고정 버전은 수정하지 않고 버전 목록과 변경 요약만 추가한다.
5. 계정 삭제·고객지원 문서와 앱 내부 문구의 일관성을 확인한다.
6. `node scripts/validate-site.mjs`를 실행한다.
7. 변경을 커밋·푸시하고 GitHub Pages 배포 완료 후 최신·이전 버전 URL을 직접 확인한다.

## 변경 시 함께 확인할 항목

- 로그인 제공자 또는 계정 연결 방식
- 수집·백업하는 운동 기록 필드
- 랭킹·공유 등 다른 이용자에게 보이는 정보
- 분석·광고 SDK와 광고 식별자
- 결제·구독·환불
- AWS 리전, 수탁자, 국외 처리
- 보유기간, 파기와 회원 탈퇴
- 만 14세 미만 이용자 처리
- HealthKit, Health Connect, 위치, 연락처, 사진 등 권한 데이터
