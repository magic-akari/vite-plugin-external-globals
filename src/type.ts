import type { HtmlTagDescriptor } from "vite";
import type { CDN } from "./cdn.js";

interface ScriptAttrs {
    integrity?: boolean | "sha256" | "sha384" | "sha512";
    crossorigin?: "anonymous" | "use-credentials";
    defer?: boolean;
    async?: boolean;
    injectTo?: HtmlTagDescriptor["injectTo"];
}

interface CDNConfig {
    cdn?: CDN;
}

export interface ScriptConfig extends ScriptAttrs, CDNConfig {
    /**
     * global identifier name
     */
    var: string;
    /**
     * name of `import foo from "name"`;
     */
    name: string;
    /**
     * package name in node_modules
     */
    pkgName?: string;
    version?: string;
    path?: string;
}

export interface Options extends ScriptAttrs, CDNConfig {
    apply?: "build" | "serve" | (() => boolean);
    entry: ScriptConfig[];
}
