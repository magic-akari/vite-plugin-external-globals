# vite-plugin-external-globals

[![build](https://github.com/magic-akari/vite-plugin-external-globals/actions/workflows/publish.yml/badge.svg)](https://github.com/magic-akari/vite-plugin-external-globals/actions/workflows/publish.yml) ![npm](https://img.shields.io/npm/v/vite-plugin-external-globals) [![License](https://img.shields.io/github/license/magic-akari/vite-plugin-external-globals)](https://github.com/magic-akari/vite-plugin-external-globals/blob/master/LICENSE)

1. Transform the import statement into a reference to a global window variable.
2. Embed the CDN script in the HTML file.

Note: This plugin only activates during the build phase.

## Installation

```bash
pnpm add -D vite-plugin-external-globals
```

## Usage

```JavaScript
import externalGlobals from "vite-plugin-external-globals";

export default defineConfig({
    plugins: [
        externalGlobals({
            injectTo: "body",
            integrity: true,
            crossorigin: "anonymous",
            entry: [
                {
                    name: "lodash",
                    path: "lodash.min.js",
                    var: "_",
                },
            ],
        }),
    ],
});
```

The `entry` defines a group of package names that need to be transformed, which corresponds to the package names introduced by the import statement in the code.

The `injectTo` indicates the location of the inserted CDN scripts in the HTML. `Integrity` and `crossorigin` are related to CSP, and can also be configured in each package of the entry.

You can specify the version using `version` field, as by default, the plugin automatically searches for the installed versions in node_modules.
In addition to `name`, you can use `pkgName` to specify cases where the library has a different name in node_modules, but such cases are rare.

You may specify your preferred CDN source via the `cdn` field, which accepts a function.

The definition of the function's type is as follows.

```TypeScript
type CDN = (name: string, version: string, path: string) => string;
```

This plugin provides popular CDN functions, such as `jsDelivr`, `unpkg`, and `cdnjs` (CloudFlare).
It also offers the libPreset function, which enables you to obtain a pre-configured preset by simply using `libPreset("react")` or `libPreset("lodash")`.
