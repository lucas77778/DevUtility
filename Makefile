SHELL = /bin/bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := build
.DELETE_ON_ERROR:
.SUFFIXES:

build: pkg

pkg: src-utility
	wasm-pack build --target web --scope dev-utility --out-name core --out-dir ../pkg src-utility --features web
	sed -i '.bak' -e 's/@dev-utility\/dev-utility-core/@dev-utility\/core/g' pkg/package.json
	rm pkg/package.json.bak

prebuild-desktop:
	pnpm merge-license
	pnpm build

build-desktop:
	pnpm tauri build

license:
	addlicense -f ./LICENSE . -i .github -i docs

version:
	pnpm run version

merge-license:
	pnpm run merge-license