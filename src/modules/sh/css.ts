import { PluginFn } from "./type";


import { CSSProperties } from "react";
import { getSize } from "./utils";

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

const arbitraryHandler: PluginFn = (className, previous, skip) => {
  const ARBITRARY_PATTERN = /(\w+)-\[(#?\w+)\]/;

  const match = className.match(ARBITRARY_PATTERN);

  const propertyKey = match?.[1];
  const propertyValue = /^[0-9]+$/.test(match?.[2] || "")
    ? getSize(Number(match?.[2]))
    : match?.[2];

  if (!propertyKey || !propertyValue) return skip();

  // console.log('prev', previous)

  return {
    background: "red",
  };
};

export const { sc } = createInstance({
  plugins: [arbitraryHandler],
});

console.log(sc("bg-[green]"));
