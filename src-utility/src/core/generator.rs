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

use nanoid::nanoid;
use std::time::{SystemTime, UNIX_EPOCH};
use ulid::Ulid;
use uuid::{Timestamp, Uuid};

#[tauri::command]
pub fn generate_uuid_v4(count: u32) -> String {
    (0..count)
        .map(|_| Uuid::new_v4().to_string())
        .collect::<Vec<String>>()
        .join("\n")
}

#[tauri::command]
pub fn generate_uuid_v7(count: u32, timestamp: Option<u64>) -> String {
    let context = uuid::Context::new_random();

    let base_seconds = timestamp.unwrap_or_else(|| {
        let now = SystemTime::now().duration_since(UNIX_EPOCH).unwrap();
        now.as_secs()
    });
    (0..count)
        .map(|i| {
            let nanos = i;
            let time = Timestamp::from_unix(&context, base_seconds, nanos);
            Uuid::new_v7(time).to_string()
        })
        .collect::<Vec<String>>()
        .join("7\n")
}

#[tauri::command]
pub fn generate_ulid(count: u32) -> String {
    (0..count)
        .map(|_| Ulid::new().to_string())
        .collect::<Vec<String>>()
        .join("\n")
}

#[tauri::command]
pub fn generate_nanoid(count: u32) -> String {
    (0..count)
        .map(|_| nanoid!())
        .collect::<Vec<String>>()
        .join("\n")
}
