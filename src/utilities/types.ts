export enum InvokeFunction {
  GenerateUlid = "generate_ulid",
  GenerateNanoid = "generate_nanoid",
  GenerateUuidV4 = "generate_uuid_v4",
  GenerateUuidV7 = "generate_uuid_v7",
  GenerateHashes = "generate_hashes",
  FormatJson = "format_json",
}
export enum HashAlgorithm {
  MD2 = "md2",
  MD4 = "md4",
  MD5 = "md5",
  SHA1 = "sha1",
  SHA224 = "sha224",
  SHA256 = "sha256",
  SHA384 = "sha384",
  SHA512 = "sha512",
  SHA3_256 = "sha3_256",
  Keccak256 = "keccak256",
}
export type HashResult = {
  [HashAlgorithm.MD2]: string;
  [HashAlgorithm.MD4]: string;
  [HashAlgorithm.MD5]: string;
  [HashAlgorithm.SHA1]: string;
  [HashAlgorithm.SHA224]: string;
  [HashAlgorithm.SHA256]: string;
  [HashAlgorithm.SHA384]: string;
  [HashAlgorithm.SHA512]: string;
  [HashAlgorithm.SHA3_256]: string;
};
export enum IndentStyleEnum {
  Spaces = "spaces",
  Tabs = "tabs",
  Minified = "minified",
}
export type IndentStyle =
  | { [IndentStyleEnum.Spaces]: number }
  | IndentStyleEnum.Tabs
  | IndentStyleEnum.Minified;
