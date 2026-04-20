import React from 'react';
import './GrainOverlay.css';

/**
 * Fixed, full-viewport noise texture.
 * Pointer-events disabled so it never blocks interactions.
 * Very low opacity — meant to be felt, not seen.
 */
export default function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
