# Loofit legal and support

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
