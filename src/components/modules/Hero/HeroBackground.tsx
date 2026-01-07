'use client';

import { Canvas } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { Suspense } from 'react';

function Scene() {
  return (
    // Drei Float: Adds gentle floating animation to its children
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={1} // Up/down float intensity
    >
      {/* Drei Stars: A simple procedural particle field */}
      <Stars
        radius={50} // Radius of the sphere of stars
        depth={50} // Depth of star field
        count={3000} // Amount of stars
        factor={4} // Size factor
        saturation={0} // Remove color for monochrome aesthetic
        fade // Faded edges
      />
    </Float>
  );
}

export default function HeroBackground() {
  return (
    // Container needs absolute positioning and z-index to sit behind content
    <div className="absolute inset-0 -z-10 h-full w-full bg-background pointer-events-none">
      {/* R3F v9 Canvas compatible with React 19 */}
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, powerPreference: 'high-performance' }} // Optimization flags
        dpr={[1, 1.5]} // Cap DPR for performance scaling
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        {/* Ambient light to ensure stars aren't totally black if they have material */}
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}