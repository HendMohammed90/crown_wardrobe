// src/vite-env.d.ts

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}
  
  declare module '*.svg' {
    const src: string;
    export default src;
  }
  