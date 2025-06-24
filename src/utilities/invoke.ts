/**
 * Copyright (c) 2023-2025, ApriilNEA LLC.
 *
 * Dual licensed under:
 * - GPL-3.0 (open source)
 * - Commercial license (contact us)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * See LICENSE file for details or contact admin@aprilnea.com
 */

import { invoke as invokeCore, InvokeOptions } from "@tauri-apps/api/core";
import {
  InvokeFunction,
  IndentStyle,
  HashResult,
  RsaKeyPair,
  RsaKeyAnalysis,
} from "./types";
import useSWRMutation, {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";

export const IS_TAURI = "__TAURI__" in window;

interface UtilitiesArgs {
  [InvokeFunction.GenerateUlid]: { count: number };
  [InvokeFunction.GenerateNanoid]: { count: number };
  [InvokeFunction.GenerateUuidV4]: { count: number };
  [InvokeFunction.GenerateUuidV7]: { count: number; timestamp?: number };
  [InvokeFunction.FormatJson]: { input: string; style: IndentStyle };
  [InvokeFunction.GenerateHashes]: { input: string };
  [InvokeFunction.EncodeBase64]: { input: string };
  [InvokeFunction.DecodeBase64]: { input: string };
  [InvokeFunction.GenerateRsaKey]: { bits: number };
  [InvokeFunction.AnalyzeRsaKey]: { key: string };
}

interface UtilitiesReturns {
  [InvokeFunction.GenerateUlid]: string;
  [InvokeFunction.GenerateNanoid]: string;
  [InvokeFunction.GenerateUuidV4]: string;
  [InvokeFunction.GenerateUuidV7]: string;
  [InvokeFunction.FormatJson]: string;
  [InvokeFunction.GenerateHashes]: HashResult;
  [InvokeFunction.EncodeBase64]: string;
  [InvokeFunction.DecodeBase64]: string;
  [InvokeFunction.GenerateRsaKey]: RsaKeyPair;
  [InvokeFunction.AnalyzeRsaKey]: RsaKeyAnalysis;
}

export function utilityInvoke<T extends InvokeFunction>(
  cmd: T,
  args: UtilitiesArgs[T],
  options?: InvokeOptions
): Promise<UtilitiesReturns[T]> {
  return invokeCore(cmd, args, options);
}

export function useUtilityInvoke<T extends InvokeFunction>(
  cmd: T,
  options?: SWRMutationConfiguration<
    UtilitiesReturns[T],
    Error,
    T,
    UtilitiesArgs[T],
    UtilitiesReturns[T]
  >
): SWRMutationResponse<UtilitiesReturns[T], Error, T, UtilitiesArgs[T]> {
  return useSWRMutation<UtilitiesReturns[T], Error, T, UtilitiesArgs[T]>(
    cmd,
    // @ts-expect-error
    (_, { arg }) => utilityInvoke(cmd, arg),
    options
  );
}
