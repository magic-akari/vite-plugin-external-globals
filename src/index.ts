import type { Plugin } from "vite";
import { config } from "./config.js";
import { transformIndexHtml } from "./transform_index_html.js";
import { Options } from "./type.js";

export * from "./cdn.js";
export * from "./presets.js";
export * from "./type.js";

export function plugin(options: Options): Plugin {
    return {
        name: "vite-plugin:external-globals",
        apply: options.apply,
        enforce: "post",
        config(userConfig, configEnv) {
            return config(options, userConfig, configEnv);
        },
        transformIndexHtml(html) {
            return transformIndexHtml(options, html);
        },
    };
}

export { plugin as default, plugin as externalGlobals };
