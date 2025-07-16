---
layout: single
title: SynDiag - Synthetic Diagnostics
math: true
permalink: /SynDiag/Overview/
sidebar: 
  nav:  "docs"
---

<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>


# About SynDiag

**SynDiag (Synthetic Diagnostics)** is a module designed to simulate various tokamak diagnostics in a modular way. Each diagnostic technique is implemented as a separate class, enabling flexible and detailed synthetic data generation for experimental comparison and validation.

The module consists of classes representing the following diagnostics:

- **PickUpCoils**: Simulates the magnetic signals measured by pickup coils placed around the tokamak.
- **SaddleCoils**: Models the magnetic response detected by saddle coils, which are sensitive to poloidal magnetic flux.
- **FluxLoops**: Represents flux loops that measure the poloidal magnetic flux linked to plasma currents.
- **ThomsonScattering**: Simulates the electron temperature and density measurements obtained via Thomson scattering diagnostics.
- **InterferometerPolarimeter**: Models interferometer and polarimeter diagnostics used for measuring line-integrated electron density and magnetic field effects.

Each class encapsulates the physics and signal processing relevant to its respective diagnostic, allowing for comprehensive synthetic diagnostic simulations within the tokamak environment.

## Folder Structure and Customization

To maintain modularity and clarity, diagnostic classes must be placed within specific folders according to the machine design:


If you are using the tokamak **Tokalab**, all diagnostic classes should be stored in the following folder: /diagnostics/Tokalab/

If you are designing a new tokamak **NewMachine**, you need to create a new folder: /diagnostics/NewMachine/ and create your diagnostics for your tokamak. 

## Adapting Tokalab Diagnostics for Other Machines

To develop diagnostics for a different machine, you can use the existing Tokalab diagnostic scripts as a template:

1. **Copy** the desired diagnostic class (e.g., `Diag_PickUpCoils.m`) from `diagnostics/TokaLab/` to your machine's folder (`diagnostics/NewMachine/`).
2. **Modify** only the geometry- and machine-specific parameters, such as:
   - Measurement locations (`R`, `Z`)
   - Coil orientations or loop endpoints
   - Noise levels or configuration behavior
3. **Keep** the measurement logic unchanged unless your diagnostic model is fundamentally different.

This modular design encourages code reuse while allowing flexibility for different experimental setups.

---

## Example

To simulate pick-up coil measurements for a machine called `NewMachine`, you would:

- Create a folder: `diagnostics/NewMachine/`
- Copy `Diag_PickUpCoils.m` from `TokaLab/` to `NewMachine/`
- Adjust the `Upload` method to load your machine’s coil positions and noise settings


<p style="color:red;"><strong>⚠️ This documentation is still a work in progress. There may be errors or inaccuracies. Please feel free to contact us if you notice any issues.</strong></p>



