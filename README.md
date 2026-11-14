# NEXUS — The Divine Archive

Browser-first interactive portfolio built with React, TypeScript, Vite, Three.js / React Three Fiber, Drei, GSAP, and Zustand.

## First increment: The Atrium

The initial deployable scene establishes the interaction contract for the whole archive:

- A procedural marble celestial figure with direct drag rotation, hover response, and free orbital inspection.
- Two physical, animated portals: Identity Sanctuary and Project Archives.
- An atmospheric temple built with reusable low-poly columns, fragments, particles, lighting, and fog.
- A persistent, horizontally scrollable location rail that works with mouse, touch, and keyboard.
- A quality selector (`cinematic`, `balanced`, `lite`) that scales environmental detail.
- Lightweight location states ready to receive genuine content—no fictitious biography, projects, or credentials.

## Scene composition

The camera enters along the temple's central axis. The sculpture sits at the convergence point, framed by paired columns. The two portals are deliberately offset so they read as artifacts in the world, not UI buttons. Distant fragments, fog and warm directional light create scale without expensive full-screen postprocessing.

## Architecture

`src/Scene.tsx` owns composable 3D elements and pointer interactions. `src/store.ts` contains navigation and quality state. `src/App.tsx` is the accessible HTML overlay and applies GSAP transitions. Future locations should be lazy-loaded scene modules and should reuse this state contract.

## Run locally

```bash
npm install
npm run dev
```

For production:

```bash
npm run build
```

Deploy the generated `dist` folder with Vercel using its Vite preset. Before production launch, add original Blender-authored, Draco-compressed GLB assets in `public/models/`; replace the procedural hero only after checking the resulting bundle and mobile frame time.

## Delivery roadmap

1. Replace the initial procedural angel with an original optimized Blender GLB and add KTX2 textures.
2. Implement content-rich Identity and Archives scenes from supplied real portfolio data.
3. Add the skills constellation, timeline, laboratory, contact gateway and working command terminal.
4. Add reduced-motion mode, screen-reader navigation route, asset-loading UI and device-based adaptive quality.
5. Audit mobile devices, run Lighthouse, and connect the GitHub repository to Vercel.
