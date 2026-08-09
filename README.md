# Loofit legal and support (archived)

> **This site has moved to <https://loofit.app>.** The legal and customer-support pages are now published from the `apps/website/public` directory of the main Loofit repository. Every page here declares a canonical URL and redirects to its counterpart on `loofit.app`.
>
> **Do not delete this repository or disable GitHub Pages.** Loofit 1.1.0 and earlier ship these URLs compiled into the binary, and the App Store listing for 1.1.0 points here. Removing the site breaks the in-app legal, support, and account-deletion links for users who have not updated. It can be retired only once those versions are no longer in use.
>
> New policy versions are authored in the main repository from now on. Do not add versions here.

Public legal and customer-support pages for Loofit, operated by PhysiqueHub.

- `/privacy/` — Privacy Policy
- `/privacy/versions/` — Privacy Policy version history
- `/terms/` — Terms of Use
- `/terms/versions/` — Terms of Use version history
- `/support/` — Customer Support
- `/account-deletion/` — Account deletion request

The site is published with GitHub Pages from the `main` branch root.

Policy versions use the effective date in `yyyy.mm.dd` format. Published version files are retained under each document's `versions` directory and must not be overwritten. See `POLICY_AUTHORING.md` for the authoring and release checklist.

Run the local validation before publishing:

```sh
node scripts/validate-site.mjs
```
