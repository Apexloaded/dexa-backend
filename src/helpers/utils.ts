import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

export function generateId() {
  return uuidv4();
}

export const sizeToBytes = (size: number, unit: 'B' | 'KB' | 'MB' | 'GB') => {
  const mb = 1024;
  const sqr = (num: number, pow: number) => Math.pow(num, pow);
  const units = {
    B: 1,
    KB: mb,
    MB: sqr(mb, 2),
    GB: sqr(mb, 3),
  };

  const sizeInBytes = size * units[unit];
  return sizeInBytes;
};

export const walletToLowercase = (wallet: string) => {
  return wallet.toLowerCase();
};

export const cleanString = (inputString: string) => {
  const cleanedString = inputString.replace(/[^a-zA-Z0-9\s.]/g, '');
  return cleanedString;
};

export const isObjectEmpty = (obj: Object) => {
  return Object.keys(obj).length === 0;
};

export const stringifySafe = (obj: any): string => {
  const cache = new WeakSet();

  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        // Circular reference found, omit it
        return '[Circular]';
      }
      // Store the value in our set
      cache.add(value);
    }
    return value;
  });
};

export const bufferToStream = (buffer: Buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

export const protocol = process.env.NODE_ENV === 'dev' ? 'http' : 'https';

export const VALID_VIDEO_MIME_TYPES = [
  'video/quicktime',
  'video/mp4',
  'video/3gp',
  'video/mkv',
  'video/mov',
  'video/webm',
  'image/heic',
  'video/x-matroska',
];

export const VALID_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
