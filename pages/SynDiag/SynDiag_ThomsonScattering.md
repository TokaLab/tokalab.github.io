---
layout: single
title: SynDiag - Thomson Scattering
math: true
permalink: /SynDiag/ThomsonScattering/
sidebar: 
  nav:  "docs"
---

<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

## Class:`Diag_ThomsonScattering` 

The `Diag_ThomsonScattering` class simulates measurements obtained from a Thomson scattering diagnostic, which provides localized values of electron density (`ne`) and electron temperature (`Te`) within a plasma.

---

### Properties

- **R**, **Z**: Horizontal and vertical coordinates of the measurement points.
- **ne**: Measured electron density at the defined positions, including noise.
- **Te**: Measured electron temperature at the defined positions, including noise.
- **ideal**: Structure containing the ideal (noise-free) values of `ne` and `Te`.
- **unit_ne**: Unit for electron density, typically `"m^{-3}"`.
- **unit_Te**: Unit for electron temperature, typically `"eV"`.
- **config**: Structure containing noise configuration and diagnostic setup parameters.

---

### Methods

#### `measure(equi)`
Performs synthetic Thomson scattering measurements using equilibrium data.

- Electron density (`ne`) and temperature (`Te`) are interpolated from the equilibrium grid at the specified diagnostic positions.
- These interpolated values are stored in `ideal.ne` and `ideal.Te`.
- Noise is added to simulate realistic measurements:
  - **Absolute noise**: Added independently of the signal's magnitude.
  - **Proportional noise**: Scales with the signal's value.
- Final values including noise are stored in `ne` and `Te`.

#### `Upload(configuration)`
Initialises the diagnostic setup by defining measurement positions and noise parameters.

- If no configuration is specified, defaults to configuration `1`.
- Measurement positions are generated as linear arrays in `R` and `Z`.
- All noise levels (absolute and proportional) are initialized to zero unless specified otherwise.

---

### Plotting Methods

#### `plot_geo()`

Plots the spatial distribution of the Thomson scattering measurement points in the poloidal plane.

#### `plot_Ne_meas()`

Plots the measured electron density values.

#### `plot_Te_meas()`

Plots the measured electron temperature values.

#### `plot_StandAlone()`

Plots both the ideal and noisy values of `ne` and `Te` side by side for comparison.

---

### Usage Example

```matlab
ts = Diag_ThomsonScattering();
ts = ts.Upload();             % Load default configuration
ts = ts.measure(equilibrium); % Simulate measurement of ne and Te
ts.plot_StandAlone();         % Visualize results
```
<p style="color:red;"><strong>⚠️ This documentation is still a work in progress. There may be errors or inaccuracies. Please feel free to contact us if you notice any issues.</strong></p>
