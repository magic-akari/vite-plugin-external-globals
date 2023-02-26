import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import type { HtmlTagDescriptor, IndexHtmlTransformResult } from "vite";
import { CDN, jsdelivr } from "./cdn.js";
import { sri } from "./sri.js";
import { Options, ScriptConfig } from "./type.js";

export function transformIndexHtml(options: Options, html: string): IndexHtmlTransformResult {
    return {
        html,
        tags: options.entry.map((m) => convert(options, m, jsdelivr)),
    };
}

function convert(options: Options, script: ScriptConfig, cdn: CDN): HtmlTagDescriptor {
    const version = script.version || resolveVersion(script.name);
    let path = script.path || resolveEntry(script.name);
    if (path.startsWith("./")) {
        path = path.slice(2);
    }

    const builder = script.cdn || options.cdn || cdn;
    const src = builder(script.name, version, path);

    let integrity: string | boolean | undefined = script.integrity || options.integrity;
    if (integrity) {
        const local_path = pkgPath(script.name, path);
        integrity = sri(local_path, integrity);
    } else {
        integrity = false;
    }

    const crossorigin = script.crossorigin || options.crossorigin || false;
    const injectTo = script.injectTo || options.injectTo;
    const async = script.async || options.async || false;
    const defer = script.defer || options.defer || false;

    return {
        tag: "script",
        attrs: { src, integrity, crossorigin, async, defer },
        injectTo,
    };
}

function resolveVersion(pkgName: string): string {
    return pkgJson(pkgName).version || "";
}

function pkgJson(pkgName: string) {
    const pkgFile = pkgPath(pkgName, "package.json");
    return JSON.parse(fs.readFileSync(pkgFile, "utf8"));
}

function pkgPath(pkgName: string, ...subPath: string[]) {
    const pwd = process.cwd();
    return path.join(pwd, "node_modules", pkgName, ...subPath);
}

function resolveEntry(pkgName: string): string {
    const package_json = pkgJson(pkgName);

    if (package_json.unpkg) {
        return package_json.unpkg;
    }

    if (package_json.jsdelivr) {
        return package_json.jsdelivr;
    }

    if (package_json.browser) {
        return package_json.browser;
    }

    if (package_json.type === "module") {
        const result = resolveExports(package_json.exports);
        if (result) {
            return result;
        }
    }
    return package_json.main || "";
}

function resolveExports(exports: unknown, ensure = false): false | string {
    if (!exports) {
        return false;
    }

    if (typeof exports === "string") {
        if (exports.includes("umd") || exports.includes("browser")) {
            return exports;
        }
        return ensure && exports;
    } else if (typeof exports === "object" && exports !== null) {
        return (
            // @ts-ignore
            resolveExports(exports.browser, true) || resolveExports(exports["."]) || resolveExports(exports.default)
        );
    }

    return false;
}
