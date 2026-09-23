"use client";

import { useState } from "react";

interface FlatIllustrationProps {
  className?: string;
  activeToken?: string | null;
}

export default function FlatIllustration({
  className = "",
  activeToken = null,
}: FlatIllustrationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        viewBox="0 0 520 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full max-h-[360px] sm:max-h-[400px] transition-transform duration-500 ease-out"
        style={{
          transform: isHovered ? "scale(1.02)" : "scale(1)",
        }}
        aria-label="Editorial flat illustration representing systems and random chaos"
        role="img"
      >
        <defs>
          {/* Subtle amber gradient for chaos energy arc */}
          <linearGradient
            id="chaos-amber-stream"
            x1="220"
            y1="240"
            x2="450"
            y2="70"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#f97316" stopOpacity="1" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.9" />
          </linearGradient>

          {/* Core glow for central algorithmic prism */}
          <filter id="chaos-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Grid pattern for background blueprint */}
          <pattern
            id="dw-blueprint-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="#242533"
              strokeWidth="0.75"
              strokeDasharray="2 4"
            />
          </pattern>
        </defs>

        {/* -------------------------------------------------------------
            LAYER 0: Architectural Blueprint Background Grid
        -------------------------------------------------------------- */}
        <rect
          x="30"
          y="30"
          width="460"
          height="340"
          rx="12"
          fill="url(#dw-blueprint-grid)"
          opacity="0.35"
        />

        {/* Framing Corner Registration Crosshairs */}
        <g stroke="#3f3f50" strokeWidth="1" opacity="0.6">
          <path d="M 24 30 L 36 30 M 30 24 L 30 36" />
          <path d="M 484 30 L 496 30 M 490 24 L 490 36" />
          <path d="M 24 370 L 36 370 M 30 364 L 30 376" />
          <path d="M 484 370 L 496 370 M 490 364 L 490 376" />
        </g>

        {/* -------------------------------------------------------------
            LAYER 1: The Isometric Workbench / System Base (.dw-illustration-slab)
        -------------------------------------------------------------- */}
        <g className="dw-illustration-slab">
          {/* Base shadow plane */}
          <polygon
            points="100,315 280,245 440,295 260,365"
            fill="#09090d"
            opacity="0.7"
          />

          {/* Main isometric work platform */}
          <polygon
            points="110,295 290,225 430,270 250,340"
            fill="#151620"
            stroke="#272838"
            strokeWidth="1.5"
          />

          {/* Platform front-left bevel edge */}
          <polygon
            points="110,295 250,340 250,352 110,307"
            fill="#101017"
            stroke="#1f202c"
            strokeWidth="1"
          />

          {/* Platform front-right bevel edge */}
          <polygon
            points="250,340 430,270 430,282 250,352"
            fill="#12131b"
            stroke="#21222e"
            strokeWidth="1"
          />

          {/* Platform surface coordinate lines */}
          <line
            x1="180"
            y1="268"
            x2="360"
            y2="313"
            stroke="#252636"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="220"
            y1="252"
            x2="320"
            y2="328"
            stroke="#252636"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Coffee cup on the desk corner (Visual nod to Scene 01 physical desk) */}
          <g transform="translate(365, 274)">
            <ellipse cx="7" cy="3" rx="7" ry="3" fill="#222330" stroke="#3d3e52" strokeWidth="1" />
            <rect x="0" y="3" width="14" height="14" rx="2" fill="#1b1c26" stroke="#333446" strokeWidth="1" />
            <path d="M 14 6 C 18 6 18 12 14 12" fill="none" stroke="#3d3e52" strokeWidth="1" />
            {/* Wisp of steam */}
            <path
              d="M 5 -1 C 4 -5 9 -7 8 -11"
              fill="none"
              stroke="#525266"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>

          {/* Mechanical keyboard with warm orange keycap (Nod to Scene 01 keyboard) */}
          <g transform="translate(240, 280)">
            <polygon
              points="0,15 50,0 95,12 45,27"
              fill="#1b1c26"
              stroke="#2e3042"
              strokeWidth="1"
            />
            {/* Rows of subtle keycaps */}
            <polygon points="12,14 45,4 52,6 19,16" fill="#292a3b" />
            <polygon points="22,17 55,7 62,9 29,19" fill="#292a3b" />
            {/* The signature orange keycap */}
            <polygon
              points="65,11 82,6 88,8 71,13"
              fill="#f97316"
              stroke="#fb923c"
              strokeWidth="0.5"
            />
          </g>
        </g>

        {/* -------------------------------------------------------------
            LAYER 2: The Developer Creator Silhouette (.dw-illustration-creator)
        -------------------------------------------------------------- */}
        <g className="dw-illustration-creator">
          {/* Seated silhouette */}
          <ellipse cx="180" cy="275" rx="16" ry="7" fill="#0d0e14" opacity="0.6" />
          
          {/* Torso & garment */}
          <path
            d="M 160 280 C 160 240 175 235 185 235 C 195 235 208 242 208 280 Z"
            fill="#222330"
            stroke="#343648"
            strokeWidth="1.25"
          />

          {/* Minimalist geometric head */}
          <circle
            cx="184"
            cy="216"
            r="13"
            fill="#e4e4e7"
            stroke="#ffffff"
            strokeWidth="1"
          />

          {/* Focus eye-line / subtle editorial profile mark */}
          <rect x="190" y="214" width="4" height="2" rx="1" fill="#181820" />

          {/* Right arm interacting with the terminal console */}
          <path
            d="M 194 246 L 222 258 L 244 252"
            fill="none"
            stroke="#d4d4d8"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Terminal Display Console */}
          <g transform="translate(225, 195)">
            {/* Screen bezel */}
            <polygon
              points="0,35 65,12 65,75 0,98"
              fill="#111219"
              stroke="#3a3b50"
              strokeWidth="1.5"
            />
            {/* Screen inner active canvas */}
            <polygon
              points="4,39 61,19 61,72 4,92"
              fill="#181924"
            />
            {/* Code syntax lines */}
            <line x1="10" y1="48" x2="35" y2="40" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="56" x2="52" y2="42" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="10" y1="64" x2="42" y2="53" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="10" y1="72" x2="28" y2="66" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="10" y1="80" x2="48" y2="67" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>

        {/* -------------------------------------------------------------
            LAYER 3: Structured System Modules (.dw-illustration-systems)
        -------------------------------------------------------------- */}
        <g className="dw-illustration-systems">
          {/* Floating System Module A: Logic Node */}
          <g
            transform="translate(130, 115)"
            className="transition-transform duration-300 ease-out"
            style={{
              transform: activeToken === "systems" ? "translateY(-4px)" : "translateY(0)",
            }}
          >
            <polygon
              points="0,22 45,0 80,14 35,36"
              fill="#1c1d28"
              stroke="#3e4056"
              strokeWidth="1.25"
            />
            <polygon points="0,22 35,36 35,46 0,32" fill="#14151e" stroke="#2a2b3b" strokeWidth="1" />
            <polygon points="35,36 80,14 80,24 35,46" fill="#171822" stroke="#2f3042" strokeWidth="1" />
            <text x="24" y="24" fill="#a1a1aa" fontSize="10" fontFamily="monospace" fontWeight="bold">
              {"{ }"}
            </text>
            <line x1="45" y1="12" x2="68" y2="20" stroke="#f97316" strokeWidth="1" />
          </g>

          {/* Dotted data bus line connecting module A to platform */}
          <path
            d="M 165 165 L 165 240 L 195 245"
            fill="none"
            stroke="#43445c"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Floating System Module B: Algorithmic Matrix */}
          <g
            transform="translate(305, 100)"
            className="transition-transform duration-300 ease-out"
            style={{
              transform: activeToken === "experiments" ? "translateY(-4px)" : "translateY(0)",
            }}
          >
            <polygon
              points="0,25 55,0 100,16 45,41"
              fill="#1e1f2b"
              stroke="#44465e"
              strokeWidth="1.25"
            />
            <polygon points="0,25 45,41 45,52 0,36" fill="#14151e" stroke="#2d2e3e" strokeWidth="1" />
            <polygon points="45,41 100,16 100,27 45,52" fill="#181924" stroke="#313245" strokeWidth="1" />
            {/* Matrix dot grid on module surface */}
            <circle cx="35" cy="22" r="1.5" fill="#f97316" />
            <circle cx="50" cy="18" r="1.5" fill="#d4d4d8" />
            <circle cx="65" cy="14" r="1.5" fill="#71717a" />
            <circle cx="45" cy="29" r="1.5" fill="#71717a" />
            <circle cx="60" cy="25" r="1.5" fill="#f97316" />
            <circle cx="75" cy="21" r="1.5" fill="#d4d4d8" />
          </g>

          {/* Dotted data connector between modules */}
          <path
            d="M 210 135 L 305 125"
            fill="none"
            stroke="#52546e"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </g>

        {/* -------------------------------------------------------------
            LAYER 4: The Generative Random Chaos Field (.dw-illustration-chaos)
        -------------------------------------------------------------- */}
        <g className="dw-illustration-chaos">
          {/* Sweeping Dynamic Amber Anomaly Curve (The spark of chaos) */}
          <path
            d="M 255 235 Q 310 180 345 130 T 435 65"
            fill="none"
            stroke="url(#chaos-amber-stream)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Secondary harmonic resonance curve */}
          <path
            d="M 260 242 Q 330 200 375 140 T 465 95"
            fill="none"
            stroke="#e4e4e7"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* Third subtle filament */}
          <path
            d="M 245 230 Q 280 150 380 90"
            fill="none"
            stroke="#f97316"
            strokeWidth="0.75"
            strokeDasharray="2 3"
            opacity="0.7"
          />

          {/* The Chaos Starburst (✦) in amber */}
          <g transform="translate(425, 55)">
            <path
              d="M 0 -14 Q 0 0 14 0 Q 0 0 0 14 Q 0 0 -14 0 Q 0 0 0 -14 Z"
              fill="#f97316"
              filter="url(#chaos-glow)"
              opacity="0.9"
            />
            <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
          </g>

          {/* Floating Diamond Node */}
          <polygon
            points="360,60 370,48 380,60 370,72"
            fill="#e4e4e7"
            stroke="#ffffff"
            strokeWidth="1"
          />

          {/* Mini Starburst 2 */}
          <g transform="translate(325, 45)">
            <path
              d="M 0 -7 Q 0 0 7 0 Q 0 0 0 7 Q 0 0 -7 0 Q 0 0 0 -7 Z"
              fill="#fbbf24"
            />
          </g>

          {/* Orbiting Chaos Particles */}
          <circle cx="455" cy="115" r="3" fill="#f97316" />
          <circle cx="410" cy="160" r="2" fill="#e4e4e7" />
          <circle cx="340" cy="78" r="2.5" fill="#f97316" opacity="0.8" />
          <circle cx="280" cy="85" r="1.5" fill="#ffffff" />
          <circle cx="380" cy="180" r="2" fill="#71717a" />
          <circle cx="475" cy="75" r="1.5" fill="#fb923c" />
          <circle cx="150" cy="95" r="2" fill="#a1a1aa" />

          {/* Floating Abstract Symbols & Mathematical Tokens */}
          <g fill="#a1a1aa" fontSize="11" fontFamily="monospace" fontWeight="500">
            <text x="445" y="145" fill="#f97316" opacity="0.85">λ</text>
            <text x="350" y="38" fill="#d4d4d8">∞</text>
            <text x="415" y="195" fill="#71717a">~*</text>
            <text x="110" y="105" fill="#525266">01</text>
            <text x="300" y="65" fill="#a1a1aa">{"//"}</text>
            <text x="460" y="175" fill="#525266">Δ</text>
          </g>

          {/* Chaos Coordinate Badge */}
          <g transform="translate(375, 215)">
            <rect
              x="0"
              y="0"
              width="68"
              height="18"
              rx="3"
              fill="#181924"
              stroke="#2e3042"
              strokeWidth="0.75"
            />
            <text x="6" y="13" fill="#fb923c" fontSize="8.5" fontFamily="monospace">
              [RANDOM.04]
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
