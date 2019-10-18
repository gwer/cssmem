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

const cx = cssmem(styles);
const foo = cx('foo');

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

const cx = cssmem(styles);
const button = cx('button');

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
