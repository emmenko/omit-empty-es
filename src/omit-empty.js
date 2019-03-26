import typeOf from './kind-of';

const omitEmpty = (obj, options) => {
  const omitZero = options ? options.omitZero : false;

  /* eslint-disable no-param-reassign */
  const omit = value => {
    if (Array.isArray(value)) {
      value = value.map(v => omit(v)).filter(v => !isEmpty(v, omitZero));
    }

    if (typeOf(value) === 'object') {
      const result = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(value)) {
        const val = omit(value[key]);
        if (val !== void 0) {
          result[key] = val;
        }
      }
      value = result;
    }

    if (!isEmpty(value, omitZero)) {
      return value;
    }
    return void 0;
  };
  /* eslint-enable no-param-reassign */

  const res = omit(obj);
  if (res === void 0) {
    return typeOf(obj) === 'object' ? {} : res;
  }
  return res;
};

function isEmpty(value, omitZero) {
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
      return value.length === 0;
    case 'file':
    case 'map':
    case 'set':
      return value.size === 0;
    case 'number':
      return omitZero ? value === 0 : false;
    case 'error':
      return value.message === '';
    case 'array':
      // eslint-disable-next-line no-restricted-syntax
      for (const ele of value) {
        if (!isEmpty(ele, omitZero)) {
          return false;
        }
      }
      return true;
    case 'object':
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(value)) {
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
