import { PluginFn } from "./type";


import { CSSProperties } from "react";
import { arbitraryHandler } from "./plugins/tailwind";

interface Options {
  plugins: PluginFn[];
}

const createInstance = ({ plugins }: Options) => {
  const skip = () => ({});
  const sc = (className: string) => {
    const classList = className.split(/\s+/);
    const serializedCSS = classList.reduce<CSSProperties>(
      (processed, className) => {
        const processedCSS = plugins.reduce<CSSProperties>((acc, cur) => {
          return {
            ...acc,
            ...cur(className, processed, skip),
          };
        }, {});
        return {
          ...processed,
          ...processedCSS,
        };
      },
      {}
    );
    return serializedCSS;
  };
  return { sc };
};

export const { sc } = createInstance({
  plugins: [arbitraryHandler],
});

console.log(sc("bg-[green] x-[5px]"));
