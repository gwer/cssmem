const cssmem = require('.');

const test = (name, received, expected) => {
  if (received !== expected) {
    throw new Error(`
      ${name}:
      Received: ${received}
      Expected: ${expected}
    `);
  }

  console.log(`${name} is OK`);
};

const styles = {
  foo: 'abc',
  foo_bar: 'def',
  foo_baz_qwe: 'ghi',
};

const em = cssmem(styles);
const foo = em('foo');

test('Just elem', foo(), 'abc');

test('Elem with mod', foo({ bar: true }), 'abc def');
test('Elem with bool mod', foo({ baz: 'qwe' }), 'abc ghi');
test('Elem with two mods', foo({ bar: true, baz: 'qwe' }), 'abc def ghi');

test('Elem with mod which not exist', foo({ zxc: true }), 'abc');
test('Elem with bool mod which not bool', foo({ baz: true }), 'abc');
test('Elem with not bool mod which bool', foo({ bar: 'qwe' }), 'abc');
test('Elem with two mods and one is bool mod which not bool', foo({ baz: true, bar: true }), 'abc def');
test('Elem with two mods and one is not bool mod which bool', foo({ bar: 'qwe', baz: 'qwe' }), 'abc ghi');

test('Elem not found', em('bar')(), '');

test('Mix with elem', foo({}, 'mixed'), 'abc mixed');
test('Mix with array', foo({}, ['mixed', 'fixed']), 'abc mixed fixed');
test('Mix with null mod', foo(null, 'mixed'), 'abc mixed');
test('Mix with mod', foo({ bar: true }, 'mixed'), 'abc def mixed');

console.log('\nAll test passed!')
