# CSSMEM (CSS Module, Element, Modifier)

CSSMEM is like BEM but with CSS Module instead of Block.

It works like `classnames/bind` but with CSSMEM methodology.

### Install
```
npm i --save-dev cssmem
```

### Usage
```js
import cssmem from 'cssmem';

const styles = {
  foo: 'abc',
  foo_bar: 'def',
  foo_baz_qwe: 'ghi',
};

const em = cssmem(styles);
const foo = em('foo');

foo(); // abc
foo({ bar: true }); //abc def
foo({ baz: 'qwe' }); //abc ghi
foo({ bar: true, baz: 'qwe' }); //abc def ghi
```

### More plausible example
```css
// components/MyButton/MyButton.css
.button {
  border: 1px solid #000;

  &_wide {
    width: 100%;
  }

  &_size {
    &_s {
      height: 28px;
    }
    &_m {
      height: 36px;
    }
  }
}
```

```js
// components/MyButton/index.js
import React from 'react';
import cssmem from 'cssmem';
import styles from 'MyButton.css';

const em = cssmem(styles);
const button = em('button');

const MyButton = ({
  onClick,
  text,
  wide,
  size,
}) => {
  return (
    <div className={button({ wide, size })} onClick={onClick}>
      {text}
    </div>
  );
};

export default MyButton;
```

### Mixes
You can mix other classnames by passing second argument to last call (after modifiers).

```js
const MyButton = ({
  onClick,
  text,
  wide,
  size,
  className,
}) => {
  return (
    <div className={button({ wide, size }, className)} onClick={onClick}>
      {text}
    </div>
  );
};
```

If you don't need modifiers you can skip it with `{}` or `null`.

### Configuration
If you need custom delimiters, you can change defaults:

```js
// Somewhere in the root of your app
cssmem.config.elemDelimiter = '--'; // Default is '_'
cssmem.config.modDelimiter = '-'; // Default is '_' too
```