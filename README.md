# vite-plugin-external-globals

[![build](https://github.com/magic-akari/vite-plugin-external-globals/actions/workflows/publish.yml/badge.svg)](https://github.com/magic-akari/vite-plugin-external-globals/actions/workflows/publish.yml) ![npm](https://img.shields.io/npm/v/vite-plugin-external-globals) [![License](https://img.shields.io/github/license/magic-akari/vite-plugin-external-globals)](https://github.com/magic-akari/vite-plugin-external-globals/blob/master/LICENSE)

1. Transform `import React from "react"` to `var React = window.React`.
2. Add CDN scripts to html file.

Applies only to build stage.

## Installation

Install the plugin with npm:

```bash
pnpm add -D vite-plugin-external-globals
```
