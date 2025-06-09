export enum InvokeFunction {
  GenerateUlid = "generate_ulid",
  GenerateNanoid = "generate_nanoid",
  GenerateUuidV4 = "generate_uuid_v4",
  GenerateUuidV7 = "generate_uuid_v7",
  FormatJson = "format_json",
}
export enum IndentStyleEnum {
  Spaces = "spaces",
  Tabs = "tabs",
  Minified = "minified",
}
export type IndentStyle =
  | { [IndentStyleEnum.Spaces]: number }
  | IndentStyleEnum.Tabs
  | IndentStyleEnum.Minified;
