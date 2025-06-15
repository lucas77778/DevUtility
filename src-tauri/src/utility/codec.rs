// Copyright (c) 2023-2025, ApriilNEA LLC.
//
// Dual licensed under:
// - GPL-3.0 (open source)
// - Commercial license (contact us)
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// See LICENSE file for details or contact admin@aprilnea.com

use base64::{engine::general_purpose::STANDARD as BASE64, Engine as _};
use jsonwebtoken::{decode, DecodingKey, Validation};
use serde::{Deserialize, Serialize};

#[tauri::command]
pub fn decode_base64(input: &str) -> Result<String, String> {
    BASE64
        .decode(input)
        .map_err(|e| e.to_string())
        .and_then(|bytes| String::from_utf8(bytes).map_err(|e| e.to_string()))
}

#[tauri::command]
pub fn encode_base64(input: &str) -> String {
    BASE64.encode(input.as_bytes())
}

#[derive(Debug, Serialize, Deserialize)]
pub struct JwtHeader {
    pub alg: String,
    pub typ: Option<String>,
    pub kid: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct JwtPayload {
    #[serde(flatten)]
    pub claims: serde_json::Value,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct JwtDecodeResult {
    pub header: JwtHeader,
    pub payload: JwtPayload,
    pub signature: String,
}

#[tauri::command]
pub fn decode_jwt(token: &str) -> Result<JwtDecodeResult, String> {
    let parts: Vec<&str> = token.split('.').collect();
    if parts.len() != 3 {
        return Err("Invalid JWT format".to_string());
    }

    let header = base64::decode(parts[0])
        .map_err(|_| "Invalid header encoding".to_string())
        .and_then(|bytes| {
            serde_json::from_slice::<JwtHeader>(&bytes)
                .map_err(|_| "Invalid header format".to_string())
        })?;

    let payload = base64::decode(parts[1])
        .map_err(|_| "Invalid payload encoding".to_string())
        .and_then(|bytes| {
            serde_json::from_slice::<JwtPayload>(&bytes)
                .map_err(|_| "Invalid payload format".to_string())
        })?;

    let signature = parts[2].to_string();

    Ok(JwtDecodeResult {
        header,
        payload,
        signature,
    })
}

#[tauri::command]
pub fn verify_jwt(token: &str, secret: &str) -> Result<JwtDecodeResult, String> {
    let validation = Validation::default();
    let key = DecodingKey::from_secret(secret.as_bytes());

    match decode::<serde_json::Value>(token, &key, &validation) {
        Ok(_) => decode_jwt(token),
        Err(e) => Err(e.to_string()),
    }
}
