declare const __DEV__: boolean;

// The self-check compiles with "types": [], so @types/node is not in the
// program. These are the Node APIs the tools under this folder use: reading a
// source file as text rather than importing it, and running the PDF extractor
// that verify-citations.ts drives.
declare module 'fs' {
  export function readFileSync(path: string, encoding: 'utf8'): string;
  export function existsSync(path: string): boolean;
}

declare module 'child_process' {
  export interface SpawnSyncReturn {
    status: number | null;
    stdout: string;
    stderr: string;
    error?: Error;
  }
  export function spawnSync(
    command: string,
    args: string[],
    options: { encoding: 'utf8'; maxBuffer?: number },
  ): SpawnSyncReturn;
}

declare const process: {
  env: Record<string, string | undefined>;
  platform: string;
  exitCode: number;
};
