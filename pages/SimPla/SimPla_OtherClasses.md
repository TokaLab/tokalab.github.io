---
layout: single
title: SimPla - Other Classes
math: true
permalink: /SimPla/Others/
sidebar: 
  nav:  "docs"
---

<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>


SimPla also uses additional classes defined in separate scripts. These are automatically loaded within the `equilibrium` class and are separated into different files to improve readability and modularity.

Below is a description of the additional class dependencies:

---

### `constants`

Defines fundamental physical constants used throughout the simulation. This class ensures consistency and avoids hardcoding values in multiple places.

---

### `separatrix_target`

Defines and constructs the target separatrix used in equilibrium reconstruction. It supports both file-based and parametric definitions and provides tools to identify grid points inside the separatrix and apply boundary operators.
#### **Methods:**
  - `build_separatrix(separatrix_config, geo)`  
    Main method to construct the separatrix based on the selected configuration method. Also computes the mask of points inside the separatrix.
  
  - `sep_operators(geo)`  
    Builds a sparse operator matrix and vector for applying constraints along the separatrix.
  
  - `inside_separatrix(geo)`  
    Identifies grid points located inside the separatrix polygon.
  
  - `build_separatrix_m0(separatrix_config)`  
    Loads separatrix coordinates from an external file.
  
  - `build_separatrix_m1(separatrix_config)`  
    Constructs a parametric separatrix using shaping parameters (elongation, triangularity, etc.).
  
---

### `toroidal_current`

Handles the definition and computation of the toroidal current density profile (`Jt`). It supports both constant and profile-based methods, and normalizes the current to match the total plasma current (`I_p`).
#### **Methods:**
  - `Jt_constant(geo, sep, Jt_config)`  
    Computes a uniform toroidal current density normalized to the total plasma current.
  
  - `Jt_compute(psi_n, Jt_config, geo, sep)`  
    Selects and applies a method to compute the toroidal current profile.
  
  - `Jt_method_1(psi_n, Jt_config, geo, sep)`  
    Computes a shaped toroidal current profile based on configurable parameters.

---

### `profile_kinetic`

Computes kinetic plasma profiles such as density and temperature for electrons and ions. Profiles are evaluated based on normalized flux surfaces and configurable shaping parameters.

#### **Methods:**
  - `evaluate_profiles(equi)`  
    Main interface to compute kinetic profiles based on the selected method.
  
  - `profile_kinetic_m1(equi)`  
    Computes electron and ion density and temperature using a parametric model

---

### `profile_magnetic`

Evaluates magnetic pressure and poloidal current profiles from the Grad–Shafranov solution. Also provides methods to compute MHD fields such as \( B_r \), \( B_z \), \( J_r \), and \( J_z \) from the magnetic flux function.

#### **Methods:**
  - `Evaluate_p_F(equi)`  
    Main interface to compute pressure and poloidal current profiles.
  
  - `Evaluate_p_F_m1(equi)`  
    Computes pressure and \( F^2 \) profiles using a Grad–Shafranov-based method.
  
  - `MHD_fields(equi)`  
    Computes magnetic field components (`B_r`), (`B_z`) and current densities (`J_r`), (`J_z`) from the flux function.
    
  ---

### `utilities`

Provides numerical tools used across the SimPla framework. Currently includes methods to generate finite-difference operators for spatial derivatives on the simulation grid.

#### **Methods:**
  - `differential_operators(geo)`  
  Returns first and second-order finite-difference operators in both radial (R) and vertical (Z) directions. These operators can be applied to scalar fields using matrix multiplication.

---

<p style="color:red;"><strong>⚠️ This documentation is still a work in progress. There may be errors or inaccuracies. Please feel free to contact us if you notice any issues.</strong></p>
