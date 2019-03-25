import kindOf from "./kind-of";

describe("null and undefined", function() {
  it("should work for undefined", function() {
    expect(kindOf(undefined)).toEqual("undefined");
  });

  it("should work for null", function() {
    expect(kindOf(null)).toEqual("null");
  });
});

describe("primitives", function() {
  it("should work for booleans", function() {
    expect(kindOf(true)).toEqual("boolean");
    expect(kindOf(false)).toEqual("boolean");
    expect(kindOf(new Boolean(true))).toEqual("boolean");
  });

  it("should work for numbers", function() {
    expect(kindOf(42)).toEqual("number");
    expect(kindOf(new Number(42))).toEqual("number");
  });

  it("should work for strings", function() {
    expect(kindOf("str")).toEqual("string");
    expect(kindOf(new String("str"))).toEqual("string");
  });
});

describe("objects", function() {
  it("should work for arguments", function() {
    (function() {
      expect(kindOf(arguments)).toEqual("arguments");
    })();
  });

  it("should work for buffers", function() {
    expect(kindOf(new Buffer(""))).toEqual("buffer");
  });

  it("should work for objects", function() {
    function Test() {}
    const instance = new Test();
    const literal = {};
    const createdNull = Object.create(null);
    const createdObj = Object.create({});

    expect(kindOf(instance)).toEqual("object");
    expect(kindOf(literal)).toEqual("object");
    expect(kindOf(createdNull)).toEqual("object");
    expect(kindOf(createdObj)).toEqual("object");
  });

  it("should work for dates", function() {
    expect(kindOf(new Date())).toEqual("date");
  });

  it("should work for arrays", function() {
    /* eslint no-array-constructor: 0 */
    expect(kindOf([])).toEqual("array");
    expect(kindOf([1, 2, 3])).toEqual("array");
    expect(kindOf(new Array())).toEqual("array");
  });

  it("should work for regular expressions", function() {
    expect(kindOf(/./)).toEqual("regexp");
    expect(kindOf(new RegExp("^foo$"))).toEqual("regexp");
  });

  it("should work for functions", function() {
    /* eslint no-new-func: 0 */
    expect(kindOf(function() {})).toEqual("function");
    expect(kindOf(new Function())).toEqual("function");
  });

  it("should work for Errors", function() {
    expect(kindOf(new Error(""))).toEqual("error");
  });
});

describe("es6 features", function() {
  it("should work for resolved promises", function() {
    const promise = Promise.resolve(123);
    expect(kindOf(promise)).toEqual("promise");
  });

  it("should work for rejected promises", function() {
    const promise = Promise.reject(new Error("foo bar"));
    promise.catch(function() {});
    expect(kindOf(promise)).toEqual("promise");
  });

  it("should work for generator functions", function() {
    const gen = function* named() {
      return true;
    };
    expect(kindOf(gen)).toEqual("generatorfunction");
  });

  it("should work for generator objects", function() {
    const gen = function* named() {
      return true;
    };
    expect(kindOf(gen())).toEqual("generator");
  });

  it("should work for template strings", function() {
    /* eslint quotes: 0 */
    const name = "Foo";
    expect(kindOf(`Welcome ${name} buddy`)).toEqual("string");
  });

  it("should work for Map", function() {
    const map = new Map();
    expect(kindOf(map)).toEqual("map");
    expect(kindOf(map.set)).toEqual("function");
    expect(kindOf(map.get)).toEqual("function");
    expect(kindOf(map.add)).toEqual("undefined");
  });

  it("should work for WeakMap", function() {
    const weakmap = new WeakMap();
    expect(kindOf(weakmap)).toEqual("weakmap");
    expect(kindOf(weakmap.set)).toEqual("function");
    expect(kindOf(weakmap.get)).toEqual("function");
    expect(kindOf(weakmap.add)).toEqual("undefined");
  });

  it("should work for Set", function() {
    const set = new Set();
    expect(kindOf(set)).toEqual("set");
    expect(kindOf(set.add)).toEqual("function");
    expect(kindOf(set.set)).toEqual("undefined");
    expect(kindOf(set.get)).toEqual("undefined");
  });

  it("should work for WeakSet", function() {
    const weakset = new WeakSet();
    expect(kindOf(weakset)).toEqual("weakset");
    expect(kindOf(weakset.add)).toEqual("function");
    expect(kindOf(weakset.set)).toEqual("undefined");
    expect(kindOf(weakset.get)).toEqual("undefined");
  });

  it("should work for Set Iterator", function() {
    const SetValuesIterator = new Set().values();
    expect(kindOf(SetValuesIterator)).toEqual("setiterator");
  });
  it("should work for Map Iterator", function() {
    const MapValuesIterator = new Map().values();
    expect(kindOf(MapValuesIterator)).toEqual("mapiterator");
  });
  it("should work for Array Iterator", function() {
    const ArrayEntriesIterator = [].entries();
    expect(kindOf(ArrayEntriesIterator)).toEqual("arrayiterator");
  });
  it("should work for String Iterator", function() {
    const StringCharIterator = ""[Symbol.iterator]();
    expect(kindOf(StringCharIterator)).toEqual("stringiterator");
  });

  it("should work for Symbol", function() {
    expect(kindOf(Symbol("foo"))).toEqual("symbol");
    expect(kindOf(Symbol.prototype)).toEqual("symbol");
  });

  it("should work for Int8Array", function() {
    const int8array = new Int8Array();
    expect(kindOf(int8array)).toEqual("int8array");
  });

  it("should work for Uint8Array", function() {
    const uint8array = new Uint8Array();
    expect(kindOf(uint8array)).toEqual("uint8array");
  });

  it("should work for Uint8ClampedArray", function() {
    const uint8clampedarray = new Uint8ClampedArray();
    expect(kindOf(uint8clampedarray)).toEqual("uint8clampedarray");
  });

  it("should work for Int16Array", function() {
    const int16array = new Int16Array();
    expect(kindOf(int16array)).toEqual("int16array");
  });

  it("should work for Uint16Array", function() {
    const uint16array = new Uint16Array();
    expect(kindOf(uint16array)).toEqual("uint16array");
  });

  it("should work for Int32Array", function() {
    const int32array = new Int32Array();
    expect(kindOf(int32array)).toEqual("int32array");
  });

  it("should work for Uint32Array", function() {
    const uint32array = new Uint32Array();
    expect(kindOf(uint32array)).toEqual("uint32array");
  });

  it("should work for Float32Array", function() {
    const float32array = new Float32Array();
    expect(kindOf(float32array)).toEqual("float32array");
  });

  it("should work for Float64Array", function() {
    const float64array = new Float64Array();
    expect(kindOf(float64array)).toEqual("float64array");
  });
});
