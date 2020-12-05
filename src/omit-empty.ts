import typeOf from './kind-of';

type Options = {
  omitZero: boolean;
};

const omitEmpty = <Output, Input = unknown>(
  obj: Input,
  options?: Options
): Output => {
  const omitZero = options ? options.omitZero : false;

  /* eslint-disable no-param-reassign */
  const omit = (value: Input) => {
    if (Array.isArray(value)) {
      // @ts-expect-error
      value = value.map((v) => omit(v)).filter((v) => !isEmpty(v, omitZero));
    }

    if (typeOf(value) === 'object') {
      const result = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(value)) {
        // @ts-expect-error
        const val = omit(value[key]);
        if (val !== void 0) {
          // @ts-expect-error
          result[key] = val;
        }
      }
      // @ts-expect-error
      value = result;
    }

    if (!isEmpty(value, omitZero)) {
      return value;
    }
    return void 0;
  };
  /* eslint-enable no-param-reassign */

  let res = omit(obj) as unknown;
  if (res === void 0) {
    res = typeOf(obj) === 'object' ? {} : res;
  }
  return (res as unknown) as Output;
};

function isEmpty<Input = unknown>(value: Input, omitZero: boolean) {
  switch (typeOf(value)) {
    case 'null':
    case 'undefined':
      return true;
    case 'boolean':
    case 'function':
    case 'date':
    case 'regexp':
      return false;
    case 'string':
    case 'arguments':
      // @ts-expect-error
      return value.length === 0;
    case 'file':
    case 'map':
    case 'set':
      // @ts-expect-error
      return value.size === 0;
    case 'number':
      // @ts-expect-error
      return omitZero ? value === 0 : false;
    case 'error':
      // @ts-expect-error
      return value.message === '';
    case 'array':
      // eslint-disable-next-line no-restricted-syntax
      // @ts-expect-error
      for (const ele of value) {
        if (!isEmpty(ele, omitZero)) {
          return false;
        }
      }
      return true;
    case 'object':
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(value)) {
        // @ts-expect-error
        if (!isEmpty(value[key], omitZero)) {
          return false;
        }
      }
      return true;
    default: {
      return true;
    }
  }
}

export default omitEmpty;
