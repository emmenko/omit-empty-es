import kindOf from './kind-of';

describe('null and undefined', () => {
  it('should work for undefined', () => {
    expect(kindOf(undefined)).toEqual('undefined');
  });

  it('should work for null', () => {
    expect(kindOf(null)).toEqual('null');
  });
});

describe('primitives', () => {
  it('should work for booleans', () => {
    expect(kindOf(true)).toEqual('boolean');
    expect(kindOf(false)).toEqual('boolean');
    expect(kindOf(new Boolean(true))).toEqual('boolean');
  });

  it('should work for numbers', () => {
    expect(kindOf(42)).toEqual('number');
    expect(kindOf(new Number(42))).toEqual('number');
  });

  it('should work for strings', () => {
    expect(kindOf('str')).toEqual('string');
    expect(kindOf(new String('str'))).toEqual('string');
  });
});

describe('objects', () => {
  it('should work for arguments', () => {
    (function iife() {
      // eslint-disable-next-line prefer-rest-params
      expect(kindOf(arguments)).toEqual('arguments');
    })();
  });

  it('should work for buffers', () => {
    expect(kindOf(Buffer.from(''))).toEqual('buffer');
  });

  it('should work for objects', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function Test() {}
    // @ts-expect-error
    const instance = new Test();
    const literal = {};
    const createdNull = Object.create(null);
    const createdObj = Object.create({});

    expect(kindOf(instance)).toEqual('object');
    expect(kindOf(literal)).toEqual('object');
    expect(kindOf(createdNull)).toEqual('object');
    expect(kindOf(createdObj)).toEqual('object');
  });

  it('should work for dates', () => {
    expect(kindOf(new Date())).toEqual('date');
  });

  it('should work for arrays', () => {
    /* eslint no-array-constructor: 0 */
    expect(kindOf([])).toEqual('array');
    expect(kindOf([1, 2, 3])).toEqual('array');
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    expect(kindOf(new Array())).toEqual('array');
  });

  it('should work for regular expressions', () => {
    expect(kindOf(/./)).toEqual('regexp');
    expect(kindOf(new RegExp('^foo$'))).toEqual('regexp');
  });

  it('should work for functions', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(kindOf(function _() {})).toEqual('function');
    // eslint-disable-next-line no-new-func
    expect(kindOf(new Function())).toEqual('function');
  });

  it('should work for Errors', () => {
    expect(kindOf(new Error(''))).toEqual('error');
  });
});

describe('es6 features', () => {
  it('should work for resolved promises', () => {
    const promise = Promise.resolve(123);
    expect(kindOf(promise)).toEqual('promise');
  });

  it('should work for rejected promises', () => {
    const promise = Promise.reject(new Error('foo bar'));
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    promise.catch(function _() {});
    expect(kindOf(promise)).toEqual('promise');
  });

  it('should work for generator functions', () => {
    // eslint-disable-next-line require-yield
    const gen = function* named() {
      return true;
    };
    expect(kindOf(gen)).toEqual('generatorfunction');
  });

  it('should work for generator objects', () => {
    // eslint-disable-next-line require-yield
    const gen = function* named() {
      return true;
    };
    expect(kindOf(gen())).toEqual('generator');
  });

  it('should work for template strings', () => {
    /* eslint quotes: 0 */
    const name = 'Foo';
    expect(kindOf(`Welcome ${name} buddy`)).toEqual('string');
  });

  it('should work for Map', () => {
    const map = new Map();
    expect(kindOf(map)).toEqual('map');
    expect(kindOf(map.set)).toEqual('function');
    expect(kindOf(map.get)).toEqual('function');
    // @ts-expect-error
    expect(kindOf(map.add)).toEqual('undefined');
  });

  it('should work for WeakMap', () => {
    const weakmap = new WeakMap();
    expect(kindOf(weakmap)).toEqual('weakmap');
    expect(kindOf(weakmap.set)).toEqual('function');
    expect(kindOf(weakmap.get)).toEqual('function');
    // @ts-expect-error
    expect(kindOf(weakmap.add)).toEqual('undefined');
  });

  it('should work for Set', () => {
    const set = new Set();
    expect(kindOf(set)).toEqual('set');
    expect(kindOf(set.add)).toEqual('function');
    // @ts-expect-error
    expect(kindOf(set.set)).toEqual('undefined');
    // @ts-expect-error
    expect(kindOf(set.get)).toEqual('undefined');
  });

  it('should work for WeakSet', () => {
    const weakset = new WeakSet();
    expect(kindOf(weakset)).toEqual('weakset');
    expect(kindOf(weakset.add)).toEqual('function');
    // @ts-expect-error
    expect(kindOf(weakset.set)).toEqual('undefined');
    // @ts-expect-error
    expect(kindOf(weakset.get)).toEqual('undefined');
  });

  it('should work for Set Iterator', () => {
    const SetValuesIterator = new Set().values();
    expect(kindOf(SetValuesIterator)).toEqual('setiterator');
  });
  it('should work for Map Iterator', () => {
    const MapValuesIterator = new Map().values();
    expect(kindOf(MapValuesIterator)).toEqual('mapiterator');
  });
  it('should work for Array Iterator', () => {
    const ArrayEntriesIterator = [].entries();
    expect(kindOf(ArrayEntriesIterator)).toEqual('arrayiterator');
  });
  it('should work for String Iterator', () => {
    const StringCharIterator = ''[Symbol.iterator]();
    expect(kindOf(StringCharIterator)).toEqual('stringiterator');
  });

  it('should work for Symbol', () => {
    expect(kindOf(Symbol('foo'))).toEqual('symbol');
    expect(kindOf(Symbol.prototype)).toEqual('symbol');
  });

  it('should work for Int8Array', () => {
    const int8array = new Int8Array();
    expect(kindOf(int8array)).toEqual('int8array');
  });

  it('should work for Uint8Array', () => {
    const uint8array = new Uint8Array();
    expect(kindOf(uint8array)).toEqual('uint8array');
  });

  it('should work for Uint8ClampedArray', () => {
    const uint8clampedarray = new Uint8ClampedArray();
    expect(kindOf(uint8clampedarray)).toEqual('uint8clampedarray');
  });

  it('should work for Int16Array', () => {
    const int16array = new Int16Array();
    expect(kindOf(int16array)).toEqual('int16array');
  });

  it('should work for Uint16Array', () => {
    const uint16array = new Uint16Array();
    expect(kindOf(uint16array)).toEqual('uint16array');
  });

  it('should work for Int32Array', () => {
    const int32array = new Int32Array();
    expect(kindOf(int32array)).toEqual('int32array');
  });

  it('should work for Uint32Array', () => {
    const uint32array = new Uint32Array();
    expect(kindOf(uint32array)).toEqual('uint32array');
  });

  it('should work for Float32Array', () => {
    const float32array = new Float32Array();
    expect(kindOf(float32array)).toEqual('float32array');
  });

  it('should work for Float64Array', () => {
    const float64array = new Float64Array();
    expect(kindOf(float64array)).toEqual('float64array');
  });
});
