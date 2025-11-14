import React from "react";

const DirhamIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="-4 0 25 25"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Vertical stem of D */}
    <line x1="6" y1="4" x2="6" y2="20" />

    {/* Curved bowl of D */}
    <path d="M6 4h4a6 8 0 0 1 0 16H6" />

    {/* Double horizontal strike */}
    <line x1="2" y1="10" x2="19" y2="10" />
    <line x1="2" y1="14" x2="19" y2="14" />
  </svg>
);

export default DirhamIcon;