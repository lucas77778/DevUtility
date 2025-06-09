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
