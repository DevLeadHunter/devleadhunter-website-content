# @devleadhunter/website-content

The **content contract** shared by every DevLeadHunter website template and by `demo-host`.

A types-only package: it exports the `SiteContent` interface (and a few sub-types) plus a tiny
`emptySiteContent()` helper. There is **one** definition of the content shape, so it never
drifts between the templates and the tunnel.

> Architecture reference: `TEMPLATES_ARCHITECTURE.md` in the main `devleadhunter` repo.

## The contract

```ts
import type { SiteContent } from '@devleadhunter/website-content'
import { emptySiteContent } from '@devleadhunter/website-content'
```

**Golden rule:** every key is **optional** — an empty/absent key hides its section. Only add
**transverse** fields here (useful to several trades). A field specific to a single template
stays inside that template, never in this shared contract.

## Consume it (templates + demo-host)

The repo is **public**, so consumers pull it over HTTPS with **no token**. Add it to
`package.json`, pinned by tag:

```json
{
  "dependencies": {
    "@devleadhunter/website-content": "github:DevLeadHunter/devleadhunter-website-content#v1.0.0"
  }
}
```

```bash
npm install
```

`dist/` is **not committed** — npm rebuilds it from `src/` via the `prepare` script when the
package is installed (locally or as a git dependency).

## Develop this package

```bash
npm install        # installs deps + builds dist/ (prepare)
npm run build      # tsc → dist/index.js + dist/index.d.ts
npm run lint       # prettier --check
npm run format
```

## Release

1. Edit `src/index.ts` (keep every field optional; add only transverse fields).
2. `feat`/`fix` commit.
3. Bump the version and tag `vX.Y.Z` (semver).
4. Bump the pinned `#vX.Y.Z` in each consumer's `package.json`.

## Structure

```
devleadhunter-website-content/
├── src/index.ts       # SiteContent + sub-types + emptySiteContent()
├── tsconfig.json      # tsc build → dist/ (declaration + declarationMap)
├── package.json       # types-only package, main: dist, prepare: build
└── dist/              # generated (gitignored)
```
