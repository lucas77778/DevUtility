// import { InvokeFunction, IndentStyle } from "./utilities/types";

// declare module "@tauri-apps/api/core" {
//   interface InvokeArgs {
//     [InvokeFunction.GenerateUlid]: { count: number };
//     [InvokeFunction.GenerateNanoid]: { count: number };
//     [InvokeFunction.GenerateUuidV4]: { count: number };
//     [InvokeFunction.GenerateUuidV7]: { count: number; timestamp?: number };
//     [InvokeFunction.JsonFormat]: { json_str: string; style: IndentStyle };
//   }

//   interface InvokeReturns {
//     [InvokeFunction.GenerateUlid]: string;
//     [InvokeFunction.GenerateNanoid]: string;
//     [InvokeFunction.GenerateUuidV4]: string;
//     [InvokeFunction.GenerateUuidV7]: string;
//     [InvokeFunction.JsonFormat]: string;
//   }

//   function invoke<T extends InvokeFunction>(
//     cmd: T,
//     args: InvokeArgs[T],
//     options?: InvokeOptions
//   ): Promise<InvokeReturns[T]>;
// }

import { invoke as invokeCore, InvokeOptions } from "@tauri-apps/api/core";
import { InvokeFunction, IndentStyle } from "./utilities/types";

interface InvokeArgs {
  [InvokeFunction.GenerateUlid]: { count: number };
  [InvokeFunction.GenerateNanoid]: { count: number };
  [InvokeFunction.GenerateUuidV4]: { count: number };
  [InvokeFunction.GenerateUuidV7]: { count: number; timestamp?: number };
  [InvokeFunction.FormatJson]: { input: string; style: IndentStyle };
}

interface InvokeReturns {
  [InvokeFunction.GenerateUlid]: string;
  [InvokeFunction.GenerateNanoid]: string;
  [InvokeFunction.GenerateUuidV4]: string;
  [InvokeFunction.GenerateUuidV7]: string;
  [InvokeFunction.FormatJson]: string;
}

export function invoke<T extends InvokeFunction>(
  cmd: T,
  args: InvokeArgs[T],
  options?: InvokeOptions
): Promise<InvokeReturns[T]> {
  return invokeCore(cmd, args, options);
}
