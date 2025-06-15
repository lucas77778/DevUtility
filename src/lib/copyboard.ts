/**
 * Copyright 2025 AprilNEA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { writeText, readText } from "@tauri-apps/plugin-clipboard-manager";

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await writeText(text);
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    throw error;
  }
}

export async function readFromClipboard(): Promise<string> {
  try {
    const content = await readText();
    return content;
  } catch (error) {
    console.error("Failed to read from clipboard:", error);
    throw error;
  }
}
