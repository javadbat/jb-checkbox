# Changelog

## [1.5.0] - 2026-07-30

### Added

- Added the standard `formDisabledCallback()` to synchronize the component disabled state with disabled forms and fieldsets.
- Added the standard `formResetCallback()` to restore `initialValue` and clear validation state.
- Added Storybook interaction coverage for initial-value initialization, live-value precedence, explicit `null`, and native form reset.

### Changed

- Added the React `initialValue` prop and forwarded `value` and `initialValue` directly as React 19 custom-element properties.
- Updated `initialValue` to seed `value` only until the live value is explicitly set; native form reset restores the latest initial value and re-enables initialization.
- Updated the React wrapper so an omitted `value` does not overwrite `initialValue`, while explicit `null` still clears the live value.
- Standardized all custom theme recipes on `jb-checkbox.<theme>-style` selectors without redundant component hook classes.

### Fixed

- fix name assignment property
- Preserved property-assigned values during connection when no `value` attribute is present.

## 1.3.0

### Added

- Added Styling docs and style story examples for shared theme packs and checkbox-specific recipes.
- Added `--jb-checkbox-check-border-radius` and `--jb-checkbox-check-border-radius-checked` to control checkbox icon radius before and after checked state.

### Changed

- Breaking: renamed public CSS variables from `--jb-check-box-size*` to `--jb-checkbox-size*`.
- Breaking: renamed `--jb-checkbox-message-error-color` to `--jb-checkbox-message-color-error`.
- Added public label font-size variables for each size.
