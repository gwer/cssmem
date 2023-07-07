if (process.env.NODE_ENV !== 'production') {
  var showedNotFoundStyles = {};
}

var cssmem = function (styles) {
  return function (elem) {
    return function (mods, mix) {
      if (process.env.NODE_ENV !== 'production') {
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
            classes.push(elem + cssmem.config.elemDelimiter + modName);
          } else if (modVal) {
            classes.push(
              elem +
                cssmem.config.elemDelimiter +
                modName +
                cssmem.config.modDelimiter +
                modVal
            );
          }
        });
      }

      return classes
        .map(function (className, inx) {
          if (typeof styles[className] === 'string') {
            return styles[className];
          } else {
            if (process.env.NODE_ENV !== 'production') {
              if (
                !(className in showedNotFoundStyles) &&
                inx === classes.length - 1
              ) {
                console.warn(className, 'property not found in styles');
                showedNotFoundStyles[className] = true;
              }
            }

            return '';
          }
        })
        .filter(Boolean)
        .concat(mix || [])
        .join(' ');
    };
  };
};

cssmem.config = {
  elemDelimiter: '_',
  modDelimiter: '_',
};

module.exports = cssmem;
