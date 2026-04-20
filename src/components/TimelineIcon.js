import React from 'react';

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
};

const ICONS = {
  rocket: (
    <svg {...svgProps}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  graduation: (
    <svg {...svgProps}>
      <path d="M22 10v6" />
      <path d="M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  bolt: (
    <svg {...svgProps}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  scales: (
    <svg {...svgProps}>
      <path d="M12 3v18" />
      <path d="M8 21h8" />
      <path d="M4 7h4c1.5 0 3-.5 4-1 1 .5 2.5 1 4 1h4" />
      <path d="M5 7l-3 6c0 1.66 1.34 3 3 3s3-1.34 3-3z" />
      <path d="M19 7l-3 6c0 1.66 1.34 3 3 3s3-1.34 3-3z" />
    </svg>
  ),
  chat: (
    <svg {...svgProps}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  users: (
    <svg {...svgProps}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  star: (
    <svg {...svgProps}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  diamond: (
    <svg {...svgProps}>
      <path d="M12 2l5 7-5 13-5-13z" />
      <path d="M7 9h10" />
    </svg>
  ),
  school: (
    <svg {...svgProps}>
      <path d="M3 21V10l9-6 9 6v11" />
      <path d="M9 21v-8h6v8" />
      <path d="M3 21h18" />
    </svg>
  ),
};

export default function TimelineIcon({ name }) {
  return ICONS[name] || ICONS.star;
}
