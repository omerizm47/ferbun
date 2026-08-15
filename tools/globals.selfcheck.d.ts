declare const __DEV__: boolean;

// The self-check compiles with "types": [], so @types/node is not in the
// program. This is the one Node API it uses: reading a source file it wants to
// check as text rather than import.
declare module 'fs' {
  export function readFileSync(path: string, encoding: 'utf8'): string;
}
