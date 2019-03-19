const regex = /[^/]+@=[^/]+/g;
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
    serializedString = serializedString + key.replace(/@/g, '@A').replace(/\//g, '@S') + '@=' + serialize(value) + '/';
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
  const items = message.match(regex);
  if (items === null) {
    return message;
  }
  items.forEach((item) => {
    const kvps = item.split('@=');
    const key = kvps[0];
    const value = kvps[1];
    const escapeSlashvalues = value.replace(/@S/g, '/').match(regexArraySplitter);
    const deserializeValues = escapeSlashvalues.map(escapeSlashvalue => deserialize(escapeSlashvalue.replace(/@A/g, '@').replace(/@S/g, '/').replace(/@A/g, '@')));
    if (deserializeValues.length > 1) {
      record[key] = deserializeValues;
    } else {
      [record[key]] = deserializeValues;
    }
  });
  return record;
};

export {
  serialize,
  deserialize,
};
