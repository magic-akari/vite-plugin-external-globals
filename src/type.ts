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
    var: string;
    name: string;
    version?: string;
    path?: string;
}

export interface Options extends ScriptAttrs, CDNConfig {
    entry: ScriptConfig[];
}
