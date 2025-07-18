---
layout: single
title: SynDiag - Flux Loops
math: true
permalink: /SynDiag/FluxLoops/
sidebar: 
  nav:  "docs"
---

<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>


## Class: `Diag_FluxLoops` 

The `Diag_FluxLoops` class simulates measurements from flux loops, which are used in tokamak diagnostics to measure the local poloidal magnetic flux at specific locations within the vessel.

---

### Properties

- **R**, **Z**: Horizontal and vertical coordinates indicating the positions of the flux loops.
- **psi**: Measured poloidal flux at the specified location, including simulated noise.
- **ideal**: Structure storing the ideal (noise-free) flux measurement.
- **unit**: Unit of the flux measurement, typically `"Wb/rad"` (Weber per radian).
- **config**: Configuration structure containing parameters for simulated noise and diagnostic setup.

---

### Methods

#### `measure(equi)`
Simulates the measurement of the poloidal magnetic flux at specified coordinates.

- Interpolates the magnetic flux (`psi`) from the equilibrium data at the defined diagnostic locations.
- Stores the noise-free value in `ideal.psi`.
- Adds noise to simulate measurement uncertainty:
  - **Absolute noise**: Drawn from a normal distribution with a constant standard deviation.
  - **Proportional noise**: Based on the magnitude of the signal, scaled accordingly.
- The resulting noisy measurement is stored in `psi`.

#### `Upload(configuration)`
Loads predefined positions and noise configurations for the flux loops.

- If no configuration is provided, defaults to configuration `1`.
- Loads coordinates and other parameters from an external `.mat` file (e.g., `FluxLoopsData_config_1.mat`).
- Initializes the noise characteristics.

---

### Plotting Methods

#### `plot_geo()`

Plots the spatial distribution of the flux loops in the poloidal plane.

#### `plot_meas()`

Plots the measured magnetic flux values for each loop.

#### `plot_StandAlone()`

Plots both the ideal and noisy magnetic flux measurements for comparison.

---

### Usage Example

```matlab
flux = Diag_FluxLoops();            % Initialise FluxLoops object
flux = flux.Upload();               % Load default configuration
flux = flux.measure(equilibrium);   % Simulate measurement
flux.plot_StandAlone();             % Visualize results
```

<p style="color:red;"><strong>⚠️ This documentation is still a work in progress. There may be errors or inaccuracies. Please feel free to contact us if you notice any issues.</strong></p>
