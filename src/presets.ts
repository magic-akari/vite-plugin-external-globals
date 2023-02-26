import { ScriptConfig } from "./type.js";

const presets = {
    react: {
        var: "React",
        path: "umd/react.production.min.js",
    },
    "react-dom": {
        var: "ReactDOM",
        path: "umd/react-dom.production.min.js",
    },
    "react-router-dom": {
        var: "ReactRouterDOM",
        path: "umd/react-router-dom.min.js",
    },
    vue: {
        var: "Vue",
        path: "dist/vue.global.prod.js",
    },
    vue2: {
        var: "Vue",
        name: "vue",
        path: "dist/vue.runtime.min.js",
    },
    lodash: {
        var: "_",
        path: "lodash.min.js",
    },
};

export type PresetName = keyof typeof presets;

export type RestOption = Omit<ScriptConfig, "var" | "name" | "path">;

export function libPreset(name: PresetName, option?: RestOption): ScriptConfig {
    const config = presets[name];
    if (!config) {
        throw Error(`Unsupported ${name}`);
    }

    return {
        name,
        ...config,
        ...option,
    };
}
