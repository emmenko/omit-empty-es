const { toString } = Object.prototype;

function kindOf(val: unknown): string {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';

  let type = typeof val;
  if (type === 'boolean') return 'boolean';
  if (type === 'string') return 'string';
  if (type === 'number') return 'number';
  if (type === 'symbol') return 'symbol';
  if (type === 'function') {
    return isGeneratorFn(val) ? 'generatorfunction' : 'function';
  }

  if (isArray(val)) return 'array';
  if (isBuffer(val)) return 'buffer';
  if (isArguments(val)) return 'arguments';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  if (isRegexp(val)) return 'regexp';

  switch (ctorName(val)) {
    case 'Symbol':
      return 'symbol';
    case 'Promise':
      return 'promise';

    // Set, Map, WeakSet, WeakMap
    case 'WeakMap':
      return 'weakmap';
    case 'WeakSet':
      return 'weakset';
    case 'Map':
      return 'map';
    case 'Set':
      return 'set';

    // 8-bit typed arrays
    case 'Int8Array':
      return 'int8array';
    case 'Uint8Array':
      return 'uint8array';
    case 'Uint8ClampedArray':
      return 'uint8clampedarray';

    // 16-bit typed arrays
    case 'Int16Array':
      return 'int16array';
    case 'Uint16Array':
      return 'uint16array';

    // 32-bit typed arrays
    case 'Int32Array':
      return 'int32array';
    case 'Uint32Array':
      return 'uint32array';
    case 'Float32Array':
      return 'float32array';
    case 'Float64Array':
      return 'float64array';
    default:
      break;
  }

  if (isGeneratorObj(val)) {
    return 'generator';
  }

  // Non-plain objects
  // @ts-expect-error
  type = toString.call(val);
  switch (type) {
    // @ts-expect-error
    case '[object Object]':
      return 'object';
    // iterators
    // @ts-expect-error
    case '[object Map Iterator]':
      return 'mapiterator';
    // @ts-expect-error
    case '[object Set Iterator]':
      return 'setiterator';
    // @ts-expect-error
    case '[object String Iterator]':
      return 'stringiterator';
    // @ts-expect-error
    case '[object Array Iterator]':
      return 'arrayiterator';
    default:
      break;
  }

  // other
  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}

// @ts-expect-error
function ctorName(val) {
  return val.constructor ? val.constructor.name : null;
}

// @ts-expect-error
function isArray(val) {
  if (Array.isArray) return Array.isArray(val);
  return val instanceof Array;
}

// @ts-expect-error
function isError(val) {
  return (
    val instanceof Error ||
    (typeof val.message === 'string' &&
      val.constructor &&
      typeof val.constructor.stackTraceLimit === 'number')
  );
}

// @ts-expect-error
function isDate(val) {
  if (val instanceof Date) return true;
  return (
    typeof val.toDateString === 'function' &&
    typeof val.getDate === 'function' &&
    typeof val.setDate === 'function'
  );
}

// @ts-expect-error
function isRegexp(val) {
  if (val instanceof RegExp) return true;
  return (
    typeof val.flags === 'string' &&
    typeof val.ignoreCase === 'boolean' &&
    typeof val.multiline === 'boolean' &&
    typeof val.global === 'boolean'
  );
}

// @ts-expect-error
function isGeneratorFn(name) {
  return ctorName(name) === 'GeneratorFunction';
}

// @ts-expect-error
function isGeneratorObj(val) {
  return (
    typeof val.throw === 'function' &&
    typeof val.return === 'function' &&
    typeof val.next === 'function'
  );
}

// @ts-expect-error
function isArguments(val) {
  try {
    if (typeof val.length === 'number' && typeof val.callee === 'function') {
      return true;
    }
  } catch (err) {
    if (err instanceof Error && err.message.indexOf('callee') !== -1) {
      return true;
    }
  }
  return false;
}

/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */
// @ts-expect-error
function isBuffer(val) {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val);
  }
  return false;
}

export default kindOf;
