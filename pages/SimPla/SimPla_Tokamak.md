---
layout: single
title: SimPla - Tokamak
math: true
permalink: /SimPla/Tokamak/
sidebar: 
  nav:  "docs"
---

<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

## Class: `tokamak`

The `tokamak` class defines the core object needed to upload your tokamak (geometry, wall, etc.) and the equilibrium scenario needed for the SimPla module. It encapsulates all relevant structural, geometric, and configuration data needed to set up plasma equilibrium simulations.

### Purpose

This class provides a structured way to store and access machine-specific parameters and configurations. It acts as a central container for geometry, wall structures, computational grids, separatrix data, and equilibrium settings.

### Properties

- **machine**: Name of the tokamak (e.g., `"Tokalab"`, `"NewMachine"`).
- **R0**: Major radius of the tokamak [m].
- **a**: Minor radius of the tokamak [m].
- **wall**: Structure containing wall shape and boundary information.
- **grid**: Computational grid for geometry and equilibrium calculations.
- **separatrix**: Target separatrix definition (used in equilibrium reconstruction).
- **config**: Structure containing equilibrium and kinetic configuration parameters.

### Methods

- **`machine_upload(machine_name)`**: Loads geometry and grid information based on the selected tokamak. If no input is provided, it defaults to `"Tokalab"`. nternally, this method uses a conditional structure that uploads the characteristics from a machine specific function. For example, if `"Tokalab"` is selected, the function `"Tokalab_Geometry"` is used. If you want to upload a new machine, you can copy and modify Tokalab_Geometry to change the geometric pieces of information to create your own tokamak.
  
- **`scenario_upload()`**: Loads the equilibrium scenario (e.g., current profile, magnetic field, shape parameters) associated with the selected machine. Even this method uses a machine-specific function. For example, if `"Tokalab"` is selected, the function `"Tokalab_Scenario"` is used. This function takes  two numbers `"separatrix"` and `"toroidal_current"` as input, which are used to upload the parameters used to design the target separatrix and the method to evaluate the toroidal current given the equilibrium (see SimPla Equilibrium class and the method GSsolver). 

- **`kinetic_upload()`**: Loads kinetic configuration parameters (e.g., density and temperature profile parameters) for the selected machine. This method uses again a machine-specific function.  For example, if `"Tokalab"` is selected, the function `"Tokalab_Kinetic"` is used. This function takes one number `"kinetic_scenario"` as input and uploads the parameters associated to it. If you want to implement a new scenario for Tokalab, you can directly add it in the function `"Tokalab_Kinetic"` function. We are working on providing examples to make it easier.   

<p style="color:red;"><strong>⚠️ This documentation is still a work in progress. There may be errors or inaccuracies. Please feel free to contact us if you notice any issues.</strong></p>
