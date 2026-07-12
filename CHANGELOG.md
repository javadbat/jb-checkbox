# Changelog

## Unreleased

### Changed

- Added the React `initialValue` prop and forwarded `value` and `initialValue` directly as React 19 custom-element properties.
- Standardized all custom theme recipes on `jb-checkbox.<theme>-style` selectors without redundant component hook classes.

### Fixed

- Preserved property-assigned values during connection when no `value` attribute is present.

## 1.3.0

### Added

- Added Styling docs and style story examples for shared theme packs and checkbox-specific recipes.
- Added `--jb-checkbox-check-border-radius` and `--jb-checkbox-check-border-radius-checked` to control checkbox icon radius before and after checked state.

### Changed

- Breaking: renamed public CSS variables from `--jb-check-box-size*` to `--jb-checkbox-size*`.
- Breaking: renamed `--jb-checkbox-message-error-color` to `--jb-checkbox-message-color-error`.
- Added public label font-size variables for each size.
