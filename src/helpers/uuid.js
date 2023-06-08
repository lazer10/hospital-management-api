import { v4 as uuid, validate } from 'uuid';

// eslint-disable-next-line import/prefer-default-export
export const generator = () => uuid();

export const isUuidValid = (uuidString) => validate(uuidString);
