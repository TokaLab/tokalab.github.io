---
layout: single
title: SynDiag - Saddle Coils
math: true
permalink: /SynDiag/SaddleCoils/
sidebar: 
  nav:  "docs"
---

<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>


## `Diag_SaddleCoils` Class

The `Diag_SaddleCoils` class simulates magnetic flux measurements using saddle coils, which are placed at two different spatial locations. These diagnostics are commonly used in tokamaks to measure the difference in poloidal flux between two points.

---

### Properties

- **R1**, **Z1**: Horizontal and vertical coordinates (in meters) of the first end of the saddle coil.
- **R2**, **Z2**: Horizontal and vertical coordinates (in meters) of the second end of the saddle coil.
- **Dpsi**: Simulated flux difference measurement, including noise.
- **ideal**: Structure containing the noise-free flux difference.
- **unit**: Unit of measurement, typically `"Wb/rad"` (Weber per radian).
- **config**: Structure containing configuration settings, such as parameters for random noise.

---

### Methods

#### `measure(equi)`
Simulates the flux measurement between two points on the equilibrium flux surface.

- Interpolates the poloidal flux (`psi`) at both ends of the coil using the equilibrium object.
- Computes the flux difference between the two points.
- Adds configurable random noise:
  - Absolute noise sampled from a normal distribution with fixed standard deviation.
  - Proportional noise scaled with respect to the magnitude of the ideal signal.
- Stores both the ideal and noisy measurements.

#### `Upload(configuration)`
Loads predefined coil configurations.

- If no configuration index is given, defaults to configuration `1`.
- Loads coil endpoint positions from an external `.mat` file (e.g., `SaddleCoilsData_config_1.mat`).
- Initializes noise parameters.

---


<p style="color:red;"><strong>⚠️ This documentation is still a work in progress. There may be errors or inaccuracies. Please feel free to contact us if you notice any issues.</strong></p>
