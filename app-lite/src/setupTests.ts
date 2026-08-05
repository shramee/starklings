// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Node < 18 lacks TextEncoder; needed by starknet/@noble/hashes in Jest.
import { TextDecoder, TextEncoder } from "util";
global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;
