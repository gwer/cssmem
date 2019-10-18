# CSSMEM (CSS Module, Element, Modifier)

CSSMEM is like BEM but there is CSS Module instead of Block.

### Install
```
npm i --save-dev cssmem
```

### Using
```
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
