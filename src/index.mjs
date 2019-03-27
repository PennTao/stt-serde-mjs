const regex = /[^/]+@=[^/]*/g;
const regexArraySplitter = /[^/]+(?:[^/]*)*/g;

/**
 * A function to serialize a JSON into string
 * @param records A JSON object to be serialized to string
 * @return        STT serialized string
 */
const serialize = (records) => {
  if (records === null) {
    return '';
  }
  if (typeof records === 'string') {
    return records.replace(/@/g, '@A').replace(/\//g, '@S');
  }
  if (typeof records === 'number') {
    return records.toString();
  }
  let serializedString = '';
  if (Array.isArray(records)) {
    return records.map(record => serialize(record) + '/').join('');
  }
  Object.entries(records).forEach(([key, value]) => {
    serializedString = serializedString + serialize(key) + '@=' + serialize(value) + '/';
  });

  return serializedString;
};

/**
 * A function to deserialized a string into JSON
 * @param message A STT serialized string, usually received from Douyu danmaku server
 * @return        STT deserialized JSON representing of the message
 */

const deserialize = (message) => {
  if (message === null) {
    return null;
  }
  const record = {};
  const entries = message.match(regex);
  const items = message.match(regexArraySplitter);
  if (entries !== null) {
    entries.forEach((entry) => {
      const kvps = entry.split('@=');
      const key = kvps[0];
      const value = kvps[1];
      record[deserialize(key)] = deserialize(value);
    });
    return record;
  } if (items !== null && items.length > 1) {
    return items.map(item => deserialize(item));
  }
  return message.replace(/@A/g, '@').replace(/@S/g, '/');
};

export {
  serialize,
  deserialize,
};
