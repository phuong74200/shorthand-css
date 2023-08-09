import { CSSProperties } from "react";
import { SerializedStyles } from "@emotion/react";

export type CSSProperty = keyof CSSProperties;

export interface ShortHandCSSConfigs {
  [key: string | number]: {
    serialized: CSSProperty | CSSProperty[];
    values: {
      [key: string]: string | number;
    };
  };
}

export interface Plugin {
  handler: (className: string, skip: () => void) => SerializedStyles;
}

export type PluginFn = (
  className: string,
  previous: CSSProperties,
  skip: () => object
) => CSSProperties;
