// src/client.d.ts or src/svg.d.ts
declare module "*.svg?react" {
    import React from "react";
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export { ReactComponent };
}

declare module "*.svg" {
    const content: string; // This allows SVG imports as URLs
    export default content;
  }