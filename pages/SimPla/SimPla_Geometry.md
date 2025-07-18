---
layout: single
title: SimPla - Geometry
math: true
permalink: /SimPla/Geometry/
sidebar: 
  nav:  "docs"
---

<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

## Class: `geometry`

The `geometry` class handles all spatial and grid-related definitions for the tokamak simulation environment. It imports core machine dimensions, builds the simulation grid, defines physical boundaries, and sets up the structure for evaluating fields in space.

### Purpose

This class is responsible for constructing and managing the spatial domain in which equilibrium and kinetic simulations take place. It retrieves geometry from a `tokamak` object, builds 2D spatial grids, and defines the region enclosed by the wall.

### Properties

- **R0**: Major radius of the tokamak [m].
- **a**: Minor radius of the tokamak [m].
- **R**: 1D array of major radius (horizontal) coordinates.
- **Z**: 1D array of vertical coordinates.
- **dR**: Grid spacing in the radial direction.
- **dZ**: Grid spacing in the vertical direction.
- **grid**: Structure storing grid data (number of points, extents, and mesh).
- **wall**: Structure describing the physical wall geometry of the tokamak.

### Methods

#### `import_geometry(tok)`

Imports geometry-related data from a `tokamak` object.

- Inputs:
  - `tok`: A `tokamak` object with defined geometry and wall properties.
- Actions:
  - Copies `R0`, `a`, `grid`, and `wall` from the tokamak into the geometry class.

#### `build_geometry()`

Constructs the 2D simulation grid based on provided dimensions and wall parameters.

- Creates vectors `R` and `Z` for horizontal and vertical coordinates.
- Builds and stores the 2D mesh grid (`Rg`, `Zg`) .
- Calculates grid spacing `dR`, `dZ`.

#### `inside_wall()`

Generates a logical mask of grid points located inside the wall polygon.

- Uses MATLAB's `inpolygon()` built-in function.
- Saves the result (`true`/`false` matrix) in `obj.wall.inside`.

#### `geo_operator()`

Defines a sparse boundary operator matrix identifying grid points on the edge of the domain.

- Outputs:
  - `M_boundary`: Sparse matrix acting on boundary indices.
  - `indices`: Linear indices of boundary points.
  - `ind_bool`: Boolean mask identifying boundary positions.

### Plotting Methods

#### `plot()`

Plots the 2D grid points and the tokamak wall outline to visualize the full simulation domain.

#### `plot_wall()`

Plots only the tokamak wall shape. Useful for checking the wall geometry.


### Summary

The `geometry` class is a foundational part of the SimPla framework, setting up the computational domain with high flexibility. It ensures consistent treatment of the physical layout and provides utility tools for enforcing boundary conditions and geometric masking.

<p style="color:red;"><strong>⚠️ This documentation is still a work in progress. There may be errors or inaccuracies. Please feel free to contact us if you notice any issues.</strong></p>
