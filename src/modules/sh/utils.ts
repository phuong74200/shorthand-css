export const getSize = (value: number) => `${(value * 250) / 1000}rem`;

// work alike clsx but with sc onto it
export const cx = (...classNames: (string | { [key: string]: boolean })[]) => {
  return classNames.reduce<SerializedStyles[]>((acc, cur) => {
    if (typeof cur === 'string') return acc.concat(sc(cur));

    if (typeof cur === 'object') {
      return acc.concat(
        Object.entries(cur).reduce<SerializedStyles[]>((acc, [key, value]) => {
          if (value) return acc.concat(sc(key));
          return acc;
        }, []),
      );
    }

    return acc;
  }, []);
};