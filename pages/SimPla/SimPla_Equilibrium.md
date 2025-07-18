---
layout: single
title: SimPla - Equilibrium
math: true
permalink: /SimPla/Equilibrium/
sidebar: 
  nav:  "docs"
---

<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

## Class: `equilibrium`

The `equilibrium` class is responsible for computing magnetohydrodynamic (MHD) equilibrium solutions based on the Grad–Shafranov equation, and for extracting critical physics profiles and geometric structures from the result.

### Purpose

This class defines and solves the axisymmetric equilibrium of a tokamak, including:
- Construction of the poloidal magnetic flux (`ψ`)
- Extraction of the magnetic field and current components
- Identification of O- and X-points
- Post-processing of the Last Closed Flux Surface (LCFS)
- Evaluation of pressure, magnetic (`F²`) and kinetic profiles

---

### Properties

#### Imported Dependencies
- **geo**: Geometry class instance with grid and wall info.
- **config**: Configuration parameters, including solver and plasma settings.
- **separatrix**: Defines the target separatrix geometry.
- **utils**: Utility class for differential operators.
- **toroidal_curr**: Class with toroidal current calculation methods.
- **const**: Structure containing physical constants.
- **MHD_prof**: Class for evaluating MHD pressure and `F²` from `ψ`.
- **kin_prof**: Class for computing kinetic quantities like `ne`, `Te`, etc.

#### Computed Fields
- **psi**: Poloidal magnetic flux per unit toroidal angle  (Wb / rad).
- **Psi**: Total poloidal magnetic flux (Wb).
- **psi_n**: Normalised poloidal flux.

#### Current Densities
- **Jt**: Toroidal current density.
- **Jr**: Radial current density.
- **Jz**: Vertical current density.

#### Magnetic Fields
- **Bt**: Toroidal magnetic field.
- **Br**: Radial magnetic field.
- **Bz**: Vertical magnetic field.

#### Pressure and Magnetic Function
- **p**: Plasma pressure.
- **F2**: Squared poloidal current function (F² = R²·Bt²).

#### Kinetic Profiles
- **ne**, **ni**: Electron and ion densities.
- **Te**, **Ti**: Electron and ion temperatures.
- **pe**, **pi**: Electron and ion pressures.

#### Topology
- **Opoint**: O-point (magnetic axis) coordinates.
- **Xpoint**: X-point coordinates.
- **LCFS**: Last Closed Flux Surface (structure with shape and mask).

---

### Methods

#### `import_configuration(geo, config)`
Sets up the geometry and configuration for the equilibrium solver, and initializes default solver parameters.

#### `import_classes()`
Imports all required helper classes used in solving the equilibrium.

#### `solve_equilibrium(psi)`
Solves the Grad–Shafranov equation either from a first guess or a given initial `ψ`.

- Iteratively updates the solution using the toroidal current and Grad–Shafranov operator.
- Applies separatrix and boundary conditions.
- Tracks convergence and visualizes iteration progress.

#### `compute_profiles()`
Computes the full set of physics quantities after equilibrium solution:

- Evaluates `p`, `F²`, `Bt`, `Br`, `Bz`, `Jr`, `Jz`
- Computes kinetic quantities: `ne`, `ni`, `Te`, `Ti`, `pe`, `pi`

#### `CriticalPoints(Ip, R, inside_wall, Psi)`
Detects the O- and X-points by locating extrema in the `ψ` gradient within the domain bounded by the wall.

Returns:
- `Opoint`: Index of magnetic axis
- `Xpoint`: Index of the X-point

#### `equi_pp()`
Post-processes the final solution:

- Interpolates to high-resolution grid
- Recomputes O/X-points
- Re-normalizes `ψ` (`ψₙ`)
- Identifies the Last Closed Flux Surface (LCFS)

---

<p style="color:red;"><strong>⚠️ This documentation is still a work in progress. There may be errors or inaccuracies. Please feel free to contact us if you notice any issues.</strong></p>

