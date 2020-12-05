import omitEmpty from './index';

describe('omit-empty', () => {
  it('should return non-empty string values', () => {
    expect(omitEmpty('foo')).toBe('foo');
  });

  it('should return undefined when the value is an empty string', () => {
    expect(omitEmpty('')).toBe(void 0);
  });

  it('should return non-empty arrays', () => {
    expect(omitEmpty(['foo'])).toEqual(['foo']);
  });

  it('should omit empty values from the given object', () => {
    expect(omitEmpty({ one: {}, a: '', b: 'c' })).toEqual({ b: 'c' });
    expect(omitEmpty({ a: undefined, b: 'c' })).toEqual({ b: 'c' });
    expect(omitEmpty({ a: null, b: 'c' })).toEqual({ b: 'c' });
    expect(omitEmpty({ a: '', b: 'c' })).toEqual({ b: 'c' });
  });

  it('should omit deeply nested empty values from the given object', () => {
    const fixture = {
      foo: [{ a: '' }, { bar: 'baz' }, [{ a: '' }, { bar: 'baz' }]],
      one: {
        two: { three: { four: { abc: { xyz: '' } } }, five: '', six: 'seven' },
      },
      a: '',
      b: 'c',
    };

    expect(omitEmpty(fixture)).toEqual({
      foo: [{ bar: 'baz' }, [{ bar: 'baz' }]],
      one: { two: { six: 'seven' } },
      b: 'c',
    });
  });

  it('should omit empty objects.', () => {
    expect(omitEmpty({ a: { b: { c: 'foo' }, d: {} } })).toEqual({
      a: { b: { c: 'foo' } },
    });
  });

  it('should omit nested empty objects.', () => {
    expect(omitEmpty({ a: { b: undefined, c: 'd' } })).toEqual({
      a: { c: 'd' },
    });
    expect(omitEmpty({ a: { b: null, c: 'd' } })).toEqual({ a: { c: 'd' } });
    expect(omitEmpty({ a: { b: '', c: 'd' } })).toEqual({ a: { c: 'd' } });
  });

  it('should deeply omit nested empty objects.', () => {
    expect(omitEmpty({ a: { b: undefined, c: void 0 } })).toEqual({});
    expect(omitEmpty({ a: { b: null, c: void 0 } })).toEqual({});
    expect(omitEmpty({ a: { b: '', c: void 0 } })).toEqual({});
  });

  it('should not omit functions', () => {
    // eslint-disable-next-line no-unused-vars
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const fn = (a, b, c) => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const fn2 = () => {};
    expect(omitEmpty({ a: fn, b: fn2 })).toEqual({ a: fn, b: fn2 });
  });

  it('should omit empty strings.', () => {
    expect(omitEmpty({ a: { b: { c: 'foo' }, d: '' } })).toEqual({
      a: { b: { c: 'foo' } },
    });
  });

  it('should omit empty Map', () => {
    expect(omitEmpty({ a: { b: { c: 'foo' }, d: new Map() } })).toEqual({
      a: { b: { c: 'foo' } },
    });
  });

  it('should omit empty Set', () => {
    expect(omitEmpty({ a: { b: { c: 'foo' }, d: new Set() } })).toEqual({
      a: { b: { c: 'foo' } },
    });
  });

  it('should not omit regex', () => {
    expect(omitEmpty({ a: { b: { c: /foo/ }, d: new Set() } })).toEqual({
      a: { b: { c: /foo/ } },
    });
  });

  it('should omit empty arrays.', () => {
    expect(omitEmpty({ a: { b: { c: 'foo', d: [] }, foo: [] } })).toEqual({
      a: { b: { c: 'foo' } },
    });
    expect(
      omitEmpty({ a: { b: { c: 'foo', d: [void 0] }, foo: [null] } })
    ).toEqual({
      a: { b: { c: 'foo' } },
    });
    expect(omitEmpty({ a: { b: { c: 'foo', d: [''] }, foo: [null] } })).toEqual(
      {
        a: { b: { c: 'foo' } },
      }
    );
    expect(
      omitEmpty({ a: { z: [''], b: { c: 'foo', d: [''] }, foo: [null] } })
    ).toEqual({ a: { b: { c: 'foo' } } });
  });

  it('should not omit zero', () => {
    const actual = omitEmpty({ a: { b: { c: 'foo', d: 0 }, foo: [] } });
    const expected = { a: { b: { c: 'foo', d: 0 } } };
    expect(actual).toEqual(expected);
  });

  it('should omit zero when omitZero is true', () => {
    const expected = { a: { b: { c: 'foo' } } };
    const actual = omitEmpty(
      { a: { b: { c: 'foo', d: 0 }, foo: [] } },
      { omitZero: true }
    );
    expect(actual).toEqual(expected);
  });

  it('should not omit boolean false', () => {
    const actual = omitEmpty({
      a: { b: { c: 'foo', d: 0 }, foo: [], bar: false },
    });
    const expected = { a: { b: { c: 'foo', d: 0 }, bar: false } };
    expect(actual).toEqual(expected);
  });

  it('should not omit Dates', () => {
    const today = new Date();
    const actual = omitEmpty({
      a: { b: { c: 'foo', d: today }, foo: [], bar: false },
    });
    const expected = { a: { b: { c: 'foo', d: today }, bar: false } };
    expect(actual).toEqual(expected);
  });

  it('should omit deeply nested values', () => {
    const o = {
      a: {
        b: { c: 'foo', d: 0, e: { f: { g: {}, h: { i: 'i' } } } },
        foo: [['bar', 'baz'], []],
        bar: [],
        one: 1,
        two: 2,
        three: 0,
      },
    };

    expect(omitEmpty(o)).toEqual({
      a: {
        b: { c: 'foo', d: 0, e: { f: { h: { i: 'i' } } } },
        foo: [['bar', 'baz']],
        one: 1,
        two: 2,
        three: 0,
      },
    });
  });
});
