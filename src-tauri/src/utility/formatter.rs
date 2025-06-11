use serde::{Deserialize, Serialize};
use sonic_rs;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum IndentStyle {
    Spaces(usize),
    Tabs,
    Minified,
}

#[tauri::command]
pub fn format_json(input: &str, style: IndentStyle) -> String {
    let value: sonic_rs::Value = sonic_rs::from_str(input).unwrap();
    // let pretty_str = sonic_rs::to_string_pretty(&value).unwrap_or_else(|_| "{}".to_string());
    match style {
        IndentStyle::Minified => sonic_rs::to_string(&value).unwrap_or_else(|_| "{}".to_string()),
        IndentStyle::Spaces(size) => sonic_rs::to_string_pretty(&value)
            .unwrap_or_else(|_| "{}".to_string())
            .lines()
            .map(|line| {
                if size == 2 {
                    return line.to_string();
                }
                let leading_spaces = line.len() - line.trim_start().len();
                let indent_level = leading_spaces / 2;

                format!("{}{}", " ".repeat(indent_level * size), line.trim_start())
            })
            .collect::<Vec<_>>()
            .join("\n"),
        IndentStyle::Tabs => sonic_rs::to_string_pretty(&value)
            .unwrap_or_else(|_| "{}".to_string())
            .lines()
            .map(|line| {
                let leading_spaces = line.len() - line.trim_start().len();
                let indent_level = leading_spaces / 2; // Default is 2-space indentation
                format!("{}{}", "\t".repeat(indent_level), line.trim_start())
            })
            .collect::<Vec<_>>()
            .join("\n"),
    }
}
