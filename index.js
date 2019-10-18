const cssmem = (styles) => (elem) => (mods = {}) => {
  if (process.env.NOVE_ENV !== 'production') {
    if (!styles) {
      throw new Error('There is no styles');
    }

    if (!elem) {
      throw new Error('There is no element name');
    }
  }

  const classes = [elem];

  Object.entries(mods).forEach(([modName, modVal]) => {
    if (modVal === true) {
      classes.push(`${elem}_${modName}`)
    } else if (modVal) {
      classes.push(`${elem}_${modName}_${modVal}`)
    }
  });

  return classes
    .map(className => styles.hasOwnProperty(className) ? styles[className] : '')
    .filter(x => x)
    .join(' ');
}

module.exports = cssmem;