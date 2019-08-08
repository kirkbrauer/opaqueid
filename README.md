# OpaqueID
> A basic opaque ID generator with support for types and metadata.

## Install
Opaque ID runs on Node.js and is available as a NPM package. It can be installed as a normal NPM package:

```bash
$ npm install opaqueid
```
Or using yarn:
```bash
$ yarn add opaqueid
```

## Usage
```typescript
import { encodeId, decodeId, getIdType, getIdMetadata } from 'opaqueid';

// Encode an ID
encodeId('46Juzcyx');
// => "fDQ2SnV6Y3l4"

// Encode an ID with a type
encodeId('45745c60-7b1a-11e8-9c9c-2d42b21b1a3e', 'User');
// => "VXNlcnw0NTc0NWM2MC03YjFhLTExZTgtOWM5Yy0yZDQyYjIxYjFhM2U="

// Encode a numeric ID
encodeId(1234);
// => "fDEyMzQ="

// Encode a numeric ID with a type
encodeId(1234, 'Book');
// => "Qm9va3wxMjM0"

// Encode an ID with metadata
encodeId(2, 'Device', { type: 'TELEVISION' }));
// => "RGV2aWNlfDJ8eyJ0eXBlIjoiVEVMRVZJU0lPTiJ9"

// Decode an ID
const decoded = decodeId('Qm9va3wxMjM0'),
// => 1234

// Decode an ID with an expected type
const decoded = decodeId('RGV2aWNlfDJ8eyJ0eXBlIjoiVEVMRVZJU0lPTiJ9', 'Book');
// Error: Expected Book ID, got Device ID

// Get the ID's type
const type = getIdType('VXNlcnw0NTc0NWM2MC03YjFhLTExZTgtOWM5Yy0yZDQyYjIxYjFhM2U=');
// => "User"

// Get the ID's metadata
const metadata = getIdMetadata('RGV2aWNlfDJ8eyJ0eXBlIjoiVEVMRVZJU0lPTiJ9');
// => { type: 'TELEVISION' }
```

## Testing
```bash
$ npm test
```

## Licence
Copyright (c) 2019 Kirk Brauer.

Released under the [MIT license](https://tldrlegal.com/license/mit-license).