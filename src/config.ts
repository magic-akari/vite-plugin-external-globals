import externalGlobals from "rollup-plugin-external-globals";
import type { ConfigEnv, UserConfig } from "vite";
import type { Options } from "./type.js";

export function config(
    options: Options,
    userConfig: UserConfig,
    configEnv: ConfigEnv,
) {
    const rollupOptions = ((userConfig.build ||= {}).rollupOptions ||= {});

    let plugins = rollupOptions.plugins || [];
    let external = rollupOptions.external || [];

    if (!Array.isArray(plugins)) {
        plugins = [plugins];
    }
    plugins.push(
        externalGlobals(
            Object.fromEntries(options.entry.map((m) => [m.name, m.var])),
        ),
    );

    const entryKeys = options.entry.map((m) => m.name);

    if (typeof external === "function") {
        const old = external;
        external = (source, importer, isResolved) => {
            if (entryKeys.includes(source)) {
                return true;
            }
            return old(source, importer, isResolved);
        };
    } else {
        if (!Array.isArray(external)) {
            external = [external];
        }
        external = external.concat(entryKeys);
    }

    rollupOptions.external = external;
    rollupOptions.plugins = plugins;
}
