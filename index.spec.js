const cssmem = require('.');

describe('index.js', function() {
  const styles = {
    foo: 'abc',
    foo_bar: 'def',
    foo_baz_qwe: 'ghi',
  };

  const em = cssmem(styles);
  const foo = em('foo');

  describe('should return modifiers correctly', function() {
    it('Just elem', function() {
      expect(foo()).toBe('abc');
    });

    it('Elem with mod', function() {
      expect(foo({ bar: true })).toBe('abc def');
    });

    it('Elem with bool mod', function() {
      expect(foo({ baz: 'qwe' })).toBe('abc ghi');
    });

    it('Elem with two mods', function() {
      expect(foo({ bar: true, baz: 'qwe' })).toBe('abc def ghi');
    });

    it('Elem with mod which not exist', function() {
      expect(foo({ zxc: true })).toBe('abc');
    });

    it('Elem with bool mod which not bool', function() {
      expect(foo({ baz: true })).toBe('abc');
    });

    it('Elem with not bool mod which bool', function() {
      expect(foo({ bar: 'qwe' })).toBe('abc');
    });

    it('Elem with two mods and one is bool mod which not bool', function() {
      expect(foo({ baz: true, bar: true })).toBe('abc def');
    });

    it('Elem with two mods and one is not bool mod which bool', function() {
      expect(foo({ bar: 'qwe', baz: 'qwe' })).toBe('abc ghi');
    });
  });


  describe('should return empty', function() {
    it('Elem not found', function() {
      expect(em('bar')()).toBe('');
    });
  });


  describe('mixes', function() {
    it('Mix with elem', function() {
      expect(foo({}, 'mixed')).toBe('abc mixed');
    });
    it('Mix with array', function() {
      expect(foo({}, ['mixed', 'fixed'])).toBe('abc mixed fixed');
    });
    it('Mix with null mod', function() {
      expect(foo(null, 'mixed')).toBe('abc mixed');
    });
    it('Mix with mod', function() {
      expect(foo({ bar: true }, 'mixed')).toBe('abc def mixed');
    });
  });
});
