import InvalidIDError from './error/InvalidIDError';
import InvalidIDTypeError from './error/InvalidIDTypeError';

/**
 * Base64 encodes a string.
 * @param b The string to encode.
 */
export function encode(str: string): string {
  return Buffer.from(str).toString('base64');
}

/**
 * Base64 decodes a string
 * @param encoded The Base64 encoded string.
 */
export function decode(encoded: string): string {
  return Buffer.from(encoded, 'base64').toString('binary');
}

/**
 * Generates a base64 encoded opaque ID for an entity.
 * The default type is an empty string.
 * @param id The original ID.
 * @param type The type of the entity.
 */
export function encodeId<T extends Object = Object>(
  id: string | number,
  type: string = '',
  metadata?: T
) {
  let idData = `${type}|${id}`;
  if (metadata) idData += `|${JSON.stringify(metadata)}`;
  return encode(idData);
}

/**
 * Decodes a base64 encoded ID for an entity.
 * @param encodedId The base64 encoded ID.
 * @param type The expected type of the entity.
 */
export function decodeId(encodedId: string, type?: string): string | number {
  let decoded: string;
  try {
    decoded = decode(encodedId);
    // Throw an error if the ID does not contain delimeters
    if (!decoded.includes('|')) throw new Error('Missing delimeters');
  } catch {
    throw new InvalidIDError(type);
  }
  // Split the decoded ID
  const split = decoded.split('|');
  if (type !== undefined) {
    if (split[0] !== type) {
      throw new InvalidIDTypeError(type, split[0]);
    }
  }
  // Convert to a number if the ID is numeric
  return isNaN(split[1] as any) ? split[1] : (split[1] as any) * 1;
}

/**
 * Returns the opaque ID's entity type.
 * @param encodedId The opaque ID to check.
 */
export function getIdType(encodedId: string): string | undefined {
  // Try to decode the base64 ID and get the type
  const type = decode(encodedId).split('|')[0];
  return type === '' ? undefined : type;
}

/**
 * Returns the opaque ID's metadata.
 * @param encodedId The base64 encoded ID.
 * @param type The expected type of the entity.
 */
export function getIdMetadata<T extends Object>(
  encodedId: string,
  type: string = ''
): T | undefined {
  const decoded = decode(encodedId).split('|');
  if (decoded[0] !== type) {
    throw new InvalidIDTypeError(type, decoded[0]);
  }
  return decoded[2] ? JSON.parse(decoded[2]) : undefined;
}
