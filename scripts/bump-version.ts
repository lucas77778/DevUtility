import { readFileSync, writeFileSync } from "fs";

// Define the files to update
const files = [
  {
    path: "package.json",
    updateVersion: (content: string, newVersion: string) => {
      const pkg = JSON.parse(content);
      pkg.version = newVersion;
      return JSON.stringify(pkg, null, 2);
    },
  },
  {
    path: "src-tauri/Cargo.toml",
    updateVersion: (content: string, newVersion: string) => {
      return content.replace(/^version = ".*"$/m, `version = "${newVersion}"`);
    },
  },
  {
    path: "src-utility/Cargo.toml",
    updateVersion: (content: string, newVersion: string) => {
      return content.replace(/^version = ".*"$/m, `version = "${newVersion}"`);
    },
  },
  {
    path: "src-tauri/tauri.conf.json",
    updateVersion: (content: string, newVersion: string) => {
      const config = JSON.parse(content);
      config.version = newVersion;
      return JSON.stringify(config, null, 2);
    },
  },
];

function bumpVersion(versionType: "patch" | "minor" | "major" = "patch") {
  // Read current version from package.json
  const packageJsonPath = "package.json";
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
  const currentVersion = packageJson.version;

  // Parse current version
  const [major, minor, patch] = currentVersion.split(".").map(Number);

  // Calculate new version
  let newVersion: string;
  switch (versionType) {
    case "major":
      newVersion = `${major + 1}.0.0`;
      break;
    case "minor":
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case "patch":
    default:
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
  }

  console.log(`Bumping version from ${currentVersion} to ${newVersion}`);

  // Update all files
  files.forEach((file) => {
    try {
      const content = readFileSync(file.path, "utf-8");
      const updatedContent = file.updateVersion(content, newVersion);
      writeFileSync(file.path, updatedContent);
      console.log(`✓ Updated ${file.path}`);
    } catch (error) {
      console.error(`✗ Failed to update ${file.path}:`, error);
    }
  });

  console.log(`Version bump complete: ${newVersion}`);
}

// Get version type from command line arguments
const versionType = process.argv[2] as "patch" | "minor" | "major";
bumpVersion(versionType);
