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

### Auxiliary Classes

SimPla also uses additional classes defined in separate scripts. These are automatically loaded within the `equilibrium` class and are separated into different files to improve readability and modularity.

Below is a description of the additional class dependencies:

---

#### `constants`

Defines fundamental physical constants used throughout the simulation. This class ensures consistency and avoids hardcoding values in multiple places.

---

#### `toroidal_current`

Handles the definition and computation of the toroidal current density profile \( J_t \). It supports both constant and profile-based methods, and normalizes the current to match the total plasma current \( I_p \).
* Methods: 
  - `Jt_constant(geo, sep, Jt_config)`  
    Computes a uniform toroidal current density normalized to the total plasma current.
  
  - `Jt_compute(psi_n, Jt_config, geo, sep)`  
    Selects and applies a method to compute the toroidal current profile.
  
  - `Jt_method_1(psi_n, Jt_config, geo, sep)`  
    Computes a shaped toroidal current profile based on configurable parameters.

---

#### `profile_kinetic`

Computes kinetic plasma profiles such as density and temperature for electrons and ions. Profiles are evaluated based on normalized flux surfaces and configurable shaping parameters.

---

#### `profile_magnetic`

Evaluates magnetic pressure and poloidal current profiles from the Grad–Shafranov solution. Also provides methods to compute MHD fields such as \( B_r \), \( B_z \), \( J_r \), and \( J_z \) from the magnetic flux function.


<p style="color:red;"><strong>⚠️ This documentation is still a work in progress. There may be errors or inaccuracies. Please feel free to contact us if you notice any issues.</strong></p>
