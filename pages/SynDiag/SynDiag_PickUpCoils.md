---
layout: single
title: SynDiag - Pick Up Coils
math: true
permalink: /SynDiag/PickUpCoils/
sidebar: 
  nav:  "docs"
---

<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>


## Class:`Diag_PickUpCoils` 

The `Diag_PickUpCoils` class simulates magnetic pick-up coil diagnostics, which are used to measure magnetic fields in tokamak devices. It interpolates magnetic fields from an `equilibrium` object and can simulate measurement noise for more realistic diagnostics.

---

### Properties

- **R**: Horizontal coordinate (in meters) of the coil position.
- **Z**: Vertical coordinate (in meters) of the coil position.
- **n**: Normal unit vector of the coil, representing the direction in which the magnetic field is projected.
- **B**: Simulated magnetic field measurement, including noise.
- **ideal**: Structure containing the ideal (noise-free) magnetic field measurement.
- **unit**: Unit of measurement, typically `"T"` (Tesla).
- **config**: Structure with configuration settings, including parameters for random absolute and proportional noise.

---

### Methods

#### `measure(equi)`
Computes the magnetic field measured by each pick-up coil.

- Interpolates the magnetic field components (`Br`, `Bt`, `Bz`) from the equilibrium grid to the coil positions.
- Projects the field along the coil’s normal direction `n`.
- Adds configurable random noise (both absolute and proportional) to simulate realistic diagnostics.
- Stores both the noisy and ideal measurements.

#### `Upload(configuration)`
Loads a predefined coil configuration.

- If no argument is provided, default configuration `1` is used.
- Imports coil positions and directions from an external `.mat` file (e.g., `PickUpData_config_1.mat`).
- Initializes the noise parameters.

---

### Plotting Methods

#### `plot_geo()`

Plots the spatial distribution of the pick-up coils in the poloidal plane.

#### `plot_meas()`

Plots the measured magnetic field values for each coil.

#### `plot_StandAlone()`

Plots both the ideal and noisy magnetic field measurements for comparison.

---

### Usage Example

```matlab
pickup = Diag_PickUpCoils();            % Initialise PickUpCoils object
pickup = pickup.Upload();               % Load default configuration
pickup = pickup.measure(equilibrium);   % Simulate measurement
pickup.plot_StandAlone();               % Visualize results
```

<p style="color:red;"><strong>⚠️ This documentation is still a work in progress. There may be errors or inaccuracies. Please feel free to contact us if you notice any issues.</strong></p>
