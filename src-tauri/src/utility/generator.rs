use nanoid::nanoid;
use serde::{Deserialize, Serialize};
// use sha1::Digest as Sha1Digest;
// use sha3::Digest as Sha3Digest;
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

#[derive(Debug, Serialize, Deserialize)]
pub struct HashResult {
    pub md5: String,
    pub sha1: String,
    pub sha224: String,
    pub sha256: String,
    pub sha384: String,
    pub sha512: String,
    pub sha3_256: String,
    pub keccak256: String,
}

#[tauri::command]
pub fn generate_hashes(input: &str) {
// -> HashResult {
    // let md5 = format!("{:x}", md5::compute(input));
    // let sha1 = format!("{:x}", sha1::Sha1::from(input).digest());
    // let sha224 = format!("{:x}", sha2::Sha224::digest(input.as_bytes()));
    // let sha256 = format!("{:x}", sha2::Sha256::digest(input.as_bytes()));
    // let sha384 = format!("{:x}", sha2::Sha384::digest(input.as_bytes()));
    // let sha512 = format!("{:x}", sha2::Sha512::digest(input.as_bytes()));
    // let sha3_256 = format!("{:x}", sha3::Sha3_256::digest(input.as_bytes()));
    // let keccak256 = format!("{:x}", sha3::Keccak256::digest(input.as_bytes()));

    // HashResult {
    //     md5,
    //     sha1: "".to_string(),
    //     sha224,
    //     sha256,
    //     sha384,
    //     sha512,
    //     sha3_256,
    //     keccak256,
    // }
}
