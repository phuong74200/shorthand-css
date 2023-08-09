import { CSSProperty, PluginFn, ShortHandCSSConfigs } from "../type";
import { getSize } from "../utils";

export const template: ShortHandCSSConfigs = {
  w: {
    serialized: "width",
    values: {},
  },
  h: {
    serialized: "height",
    values: {},
  },
  bg: {
    serialized: "background",
    values: {},
  },
  x: {
    serialized: ["paddingLeft", "paddingRight"],
    values: {},
  },
};

const handleArrayValue = (value: number | string, property: CSSProperty[]) => {
  return property.reduce((acc, cur) => {
    return {
      ...acc,
      [cur as string]: value,
    };
  }, {});
};

export const arbitraryHandler: PluginFn = (className, previous, skip) => {
  const ARBITRARY_PATTERN = /(\w+)-\[(#?\w+)\]/;

  const match = className.match(ARBITRARY_PATTERN);

  const propertyKey = match?.[1];
  const propertyValue = /^[0-9]+$/.test(match?.[2] || "")
    ? getSize(Number(match?.[2]))
    : match?.[2];

  if (!propertyKey || !propertyValue || !template[propertyKey]) return skip();

  const serializedKey = template[propertyKey].serialized;

  if (Array.isArray(serializedKey))
    return handleArrayValue(propertyValue, serializedKey);
  
  return {
    [serializedKey]: propertyValue,
  };
};
