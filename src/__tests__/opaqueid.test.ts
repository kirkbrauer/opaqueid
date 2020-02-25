import {
  encode,
  decode,
  encodeId,
  decodeId,
  getIdType,
  getIdMetadata
} from '../opaqueid';

const STR = 'jh%274$jxb*@!';
const TYPE = 'Type';
const NUM = 12345;
const INVALID_ID = '8t7uhvgvkbvpivi';
const METADATA = {
  name: 'Test',
  number: 1234
};

describe('encode()', () => {
  test('Base64 encodes the given string', () => {
    expect(encode(STR)).toBe(Buffer.from(STR).toString('base64'));
  });
});

describe('decode()', () => {
  test('Base64 decodes the given string', () => {
    const ENCODED = Buffer.from(STR).toString('base64');
    expect(decode(ENCODED)).toBe(STR);
  });
});

describe('encodeId()', () => {
  test('Encodes the ID with the given type', () => {
    const OPAQUE = encodeId(STR, TYPE);
    const DECODED = decode(OPAQUE);
    expect(DECODED).toContain(TYPE);
    expect(DECODED).toContain(STR);
  });
  test('Encodes the ID with no type provided', () => {
    const OPAQUE = encodeId(STR);
    const DECODED = decode(OPAQUE);
    expect(DECODED).toContain(STR);
  });
  test('Encodes a numeric ID', () => {
    const OPAQUE = encodeId(NUM);
    const DECODED = decode(OPAQUE);
    expect(DECODED).toContain(NUM);
  });
  test('Encodes an ID with metadata', () => {
    const OPAQUE = encodeId(STR, TYPE, METADATA);
    const DECODED = decode(OPAQUE);
    expect(DECODED).toContain(TYPE);
    expect(DECODED).toContain(STR);
    expect(DECODED).toContain(JSON.stringify(METADATA));
  });
});

describe('decodeId()', () => {
  test('Correctly decodes the ID', () => {
    const OPAQUE = encodeId(STR, TYPE);
    const DECODED = decodeId(OPAQUE, TYPE);
    expect(DECODED).toBe(STR);
    expect(typeof DECODED).toEqual('string');
  });
  test('Throws an error if the expected ID type does not match the provided ID type', () => {
    const OPAQUE = encodeId(STR, TYPE);
    expect(() => {
      decodeId(OPAQUE, 'Person');
    }).toThrow();
  });
  test('Correctly decodes an ID with the default type', () => {
    const OPAQUE = encodeId(STR);
    expect(decodeId(OPAQUE)).toBe(STR);
  });
  test('Allows any type if no type is specified', () => {
    const OPAQUE = encodeId(STR, 'User');
    expect(decodeId(OPAQUE)).toBe(STR);
  });
  test('Returns a number if the ID is numeric', () => {
    const OPAQUE = encodeId(NUM);
    expect(typeof decodeId(OPAQUE)).toEqual('number');
  });
  test('Throws an error if the ID is invalid', () => {
    expect(() => {
      decodeId(INVALID_ID, 'Test');
    }).toThrow(new Error('Invalid Test ID'));
  });
  test('Throws an error if the ID is invalid and the type is undefined', () => {
    expect(() => {
      decodeId(INVALID_ID);
    }).toThrow(new Error('Invalid ID'));
  });
});

describe('getIdType()', () => {
  test('Returns the opaque IDs entity type', () => {
    const OPAQUE = encodeId(STR, TYPE);
    expect(getIdType(OPAQUE)).toBe(TYPE);
  });
  test('Returns undefined if the entity type is not defined', () => {
    const OPAQUE = encodeId(STR);
    expect(getIdType(OPAQUE)).toBeUndefined();
  });
});

describe('getIdMetadata()', () => {
  test('Returns the correct metadata object', () => {
    const OPAQUE = encodeId(STR, TYPE, METADATA);
    expect(getIdMetadata(OPAQUE, TYPE)).toEqual(METADATA);
  });
  test('Returns undefined if the ID has no metadata', () => {
    const OPAQUE = encodeId(STR);
    expect(getIdMetadata(OPAQUE)).toBeUndefined();
  });
  test('Throws an error if the expected ID type does not match the provided ID type', () => {
    expect(() => {
      const OPAQUE = encodeId(STR, TYPE, METADATA);
      getIdMetadata(OPAQUE, 'Person');
    }).toThrow();
  });
});
