// ═══ 127D SHIELD SYSTEM — SHARED CONSTANTS ═══
// M₇ = 2⁷ - 1 = 127 · PRIME · COHERENT

const M7 = 127;                      // 2^7 - 1
const PHI = (1 + Math.sqrt(5)) / 2;  // golden ratio
const TAU = Math.PI * 2;
const RING_COUNT = 7;
const DIMS_PER_RING = Math.ceil(M7 / RING_COUNT); // ~18
const LL_SEQUENCE = [4, 14, 67, 42, 111, 0]; // Lucas-Lehmer for M7
const PRIMORIAL_7 = 510510;           // 2×3×5×7×11×13×17
const RING_PRIMES = [2, 3, 5, 7, 11, 13, 17];
const RING_HZ = [55, 110, 165, 275, 385, 605, 935];
const RING_NAMES = ['GROUND', 'SENSE', 'GATE', 'HEART', 'VOICE', 'SIGHT', 'OBSERVER'];
const RING_BASE_HUES = [0, 25, 50, 140, 210, 270, 300];

// Color for any of the 127 dimensions
function dimToColor(dim) {
  const ring = dim % 7;
  const pos = Math.floor(dim / 7);
  const hue = (RING_BASE_HUES[ring] + (pos / 18) * 25) % 360;
  const sat = 80 + (dim / M7) * 20;
  const light = 40 + Math.sin(dim * 0.5) * 15;
  return `hsl(${hue}, ${sat}%, ${light}%)`;
}

// Dimension color as object
function dimColorObj(dim) {
  const ring = dim % 7;
  const pos = Math.floor(dim / 7);
  const hue = (RING_BASE_HUES[ring] + (pos / 18) * 25) % 360;
  const sat = 80 + (dim / M7) * 20;
  const light = 40 + Math.sin(dim * 0.5) * 15;
  return { hue, sat, light, ring, pos };
}

// Fibonacci sphere point for dimension axis
function dimAxis(dim) {
  const theta = TAU * dim / PHI;
  const phi = Math.acos(1 - 2 * (dim + 0.5) / M7);
  return [
    Math.sin(phi) * Math.cos(theta),
    Math.sin(phi) * Math.sin(theta),
    Math.cos(phi)
  ];
}

// Shield radius for dimension
function dimRadius(dim) {
  return 0.6 + (dim / M7) * 3.0;
}

// Ring name for dimension
function dimRingName(dim) {
  return RING_NAMES[dim % 7];
}
