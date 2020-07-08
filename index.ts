type Styles = Record<string, string> | undefined;

type Elem = string | undefined;

type Mods = string | null | {};

type Mix = string | string[] | undefined;

export default function cssmem (styles: Styles) {
  return function (elem: Elem) {
    return function (mods?: Mods, mix?: Mix) {
      if (process.env.NOVE_ENV !== 'production') {
        if (!styles) {
          throw new Error('There is no styles');
        }

        if (!elem) {
          throw new Error('There is no element name');
        }
      }

      const classes = [elem];

      if (mods) {
        Object.getOwnPropertyNames(mods).forEach(function (modName) {
          const modVal = mods[modName];

          if (modVal === true) {
            classes.push([elem, modName].join('_'));
          } else if (modVal) {
            classes.push([elem, modName, modVal].join('_'));
          }
        });
      }

      return classes
        .map(function (className) {
          return styles.hasOwnProperty(className) ? styles[className] : '';
        })
        .filter(Boolean)
        .concat(mix || [])
        .join(' ');
    };
  };
};
