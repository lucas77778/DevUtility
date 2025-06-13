import { invoke as invokeCore, InvokeOptions } from "@tauri-apps/api/core";
import { InvokeFunction, IndentStyle, HashResult } from "./types";

export const IS_TAURI = "__TAURI__" in window;

interface UtilitiesArgs {
  [InvokeFunction.GenerateUlid]: { count: number };
  [InvokeFunction.GenerateNanoid]: { count: number };
  [InvokeFunction.GenerateUuidV4]: { count: number };
  [InvokeFunction.GenerateUuidV7]: { count: number; timestamp?: number };
  [InvokeFunction.FormatJson]: { input: string; style: IndentStyle };
  [InvokeFunction.GenerateHashes]: { input: string };
}

interface UtilitiesReturns {
  [InvokeFunction.GenerateUlid]: string;
  [InvokeFunction.GenerateNanoid]: string;
  [InvokeFunction.GenerateUuidV4]: string;
  [InvokeFunction.GenerateUuidV7]: string;
  [InvokeFunction.FormatJson]: string;
  [InvokeFunction.GenerateHashes]: HashResult;
}

export function utilityInvoke<T extends InvokeFunction>(
  cmd: T,
  args: UtilitiesArgs[T],
  options?: InvokeOptions
): Promise<UtilitiesReturns[T]> {
  return invokeCore(cmd, args, options);
}