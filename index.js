var cssmem = function (styles) {
  return function (elem) {
    return function (mods, mix) {
      if (process.env.NOVE_ENV !== 'production') {
        if (!styles) {
          throw new Error('There is no styles');
        }

        if (!elem) {
          throw new Error('There is no element name');
        }
      }

      var classes = [elem];

      if (mods) {
        Object.getOwnPropertyNames(mods).forEach(function (modName) {
          var modVal = mods[modName];

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

module.exports = cssmem;
