process.env.NODE_ENV = 'production';

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
  foo: 'm_foo',
  foo_bar: 'm_foo_bar',
  foo_baz_qwe: 'm_foo_baz_qwe',
  'foo--bar': 'm_foo--bar',
  'foo--baz-qwe': 'm_foo--baz-qwe',
};

const em = cssmem(styles);
const foo = em('foo');

test('Just elem', foo(), 'm_foo');

test('Elem with bool mod', foo({ bar: true }), 'm_foo m_foo_bar');
test('Elem with mod', foo({ baz: 'qwe' }), 'm_foo m_foo_baz_qwe');
test(
  'Elem with two mods',
  foo({ bar: true, baz: 'qwe' }),
  'm_foo m_foo_bar m_foo_baz_qwe'
);

test('Elem with mod which not exist', foo({ zxc: true }), 'm_foo');
test('Elem with bool mod which not bool', foo({ baz: true }), 'm_foo');
test('Elem with not bool mod which bool', foo({ bar: 'qwe' }), 'm_foo');
test(
  'Elem with two mods and one is bool mod which not bool',
  foo({ baz: true, bar: true }),
  'm_foo m_foo_bar'
);
test(
  'Elem with two mods and one is not bool mod which bool',
  foo({ bar: 'qwe', baz: 'qwe' }),
  'm_foo m_foo_baz_qwe'
);

test('Elem not found', em('bar')(), '');

test('Mix with elem', foo({}, 'mixed'), 'm_foo mixed');
test('Mix with array', foo({}, ['mixed', 'fixed']), 'm_foo mixed fixed');
test('Mix with null mod', foo(null, 'mixed'), 'm_foo mixed');
test('Mix with mod', foo({ bar: true }, 'mixed'), 'm_foo m_foo_bar mixed');

cssmem.config.elemDelimiter = '--';
cssmem.config.modDelimiter = '-';

test(
  'Elem with custom delimiter and bool mod',
  foo({ bar: true }),
  'm_foo m_foo--bar'
);
test(
  'Elem with custom delimiter and mod',
  foo({ baz: 'qwe' }),
  'm_foo m_foo--baz-qwe'
);

console.log('\nAll test passed!');
