---
layout: single
title: SimPla - Simulated Plasma
math: true
permalink: /SimPla/Overview/
sidebar: 
  nav:  "docs"
---

<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>


# About SimPla

**SimPla (Simulated Plasma)** is a module designed to reconstruct plasma equilibrium given a target separatrix and various hyperparameters. It enables detailed modelling of tokamak plasma behaviour through a structured and modular approach.

The module is written in both MATLAB and Python. Moreover, a MATLAB non-object oriented version, usefull for students working for the first time with MATLAB, can be found [here](/SimPla/SimPla_edu/). 

The module is composed of three main classes:

- **Tokamak**: Handles tokamak-specific information and parameters essential for simulation.
- **Geometry**: Prepares and manages the geometric configurations necessary for equilibrium calculations.
- **Equilibrium**: Contains all methods and variables required to compute and analyse the plasma equilibrium.

Moreover, SimPla uses other classes automatically uploaded in the **equilibrium** one, descrubed in **SimPla - Other Classes**.

Together, these classes provide a comprehensive framework to simulate and study plasma equilibria in tokamak devices.


<p style="color:red;"><strong>⚠️ This documentation is still a work in progress. There may be errors or inaccuracies. Please feel free to contact us if you notice any issues.</strong></p>


