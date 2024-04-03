# @nodecfdi/rfc ChangeLog

## 2.0.2

### Patch Changes - Update linting and build tools

- Remove from ci workflow node version 17
- Fix renovate config for github
- Revert build tool to use tsup
- Update README with latest changes
- Update commitlint cli and config
- Update eslint, prettier, tsconfig to use standard nodecfdi config
- Update dependencies

## 2.0.1

### Patch Changes - Fix types

- Fix types in exports require, import
- Update dependencies
- Update commitlint cli and config

## 2.0.0

### Major Changes - Change build tool, linter tools

- Update dependencies
- Update docs with new theme
- Replace tsup and usage vite in library mode
- Update types exports for typescript
- Update CI with latest github actions
- Force to more strict rules on eslint and prettier
- Change luxon dependency to luxon has peer dependency and optionally @types/luxon peer dependency

## 1.3.2 - Maintenance and Small Optimizations

- Update class `Checksums` with small optimization
- Update dependencis
- Replace rollup to tsup for generate lib
- Update types exports for typescript module and commonjs
- Update to ESM script
- Update CI workflow for fix pipeline to latest github changes
- Drop support to node versions < 16

## 1.3.1

### Patch Changes - Change export for build process using bundlers

- Resolve exports for usage with bundlers like a vite|rollup
- Update dependencies

## 1.3.0

### Minor Changes - Drop support to node 12

- Remove support to node version 12

## 1.2.3

### Change build tool from microbundle to rollup

- Change build tool
- Update dependencies
- Added api-extractor for check types `.d.ts`
- Replace microbundle to rollup
- Replace jest for vitest (added support to multiple environment tests like a node or browser)

## 1.2.2

## CI

- Update workflow for use pnpm and better test coverage
- Added SonarCloud for better continuous code quality

### Build

- refactor change from rollup bundle to microbundle

## 1.2.1

- Fixed method isValid and checkIsValid, problem with bad flags
- Update method isValid with use of parameter flag
- Update dependencies

## 1.2.0

- Added methods isValid, checkIsValid and obtainDate
- Update dependencies
- Minor fixes
- Updated eslint rules for better clear code

## 1.1.0

- Added ES6 and Rollup support
- Browser support
- Updated dependencies
- Better test files
