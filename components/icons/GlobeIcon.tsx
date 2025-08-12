
import React from 'react';

export const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM4 12c0-1.46.42-2.82 1.15-4H6v8h-.85C4.42 14.82 4 13.46 4 12Zm8.5 8c-1.39 0-2.68-.45-3.72-1.22v-2.5c1 .58 2.06.91 3.22.91s2.22-.33 3.22-.91v2.5A6.93 6.93 0 0 1 12.5 20ZM12 11.5c-1.16 0-2.22-.33-3.22-.91V8.41c1 .58 2.06.91 3.22.91s2.22-.33 3.22-.91v2.18c-1 .58-2.06.91-3.22.91Zm6.85-3H18V6.15c.73 1.18 1.15 2.54 1.15 4a8.16 8.16 0 0 1-.3 2H18V8Z" />
  </svg>
);
