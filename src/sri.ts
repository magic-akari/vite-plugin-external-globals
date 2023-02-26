import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const enc = "utf8" as const;

export function sriContent(content: string, algorithm: string): string {
    const hash = createHash(algorithm).update(content, enc);
    const sha = hash.digest("base64");

    return algorithm + "-" + sha;
}

export function sri(file: string, algorithm: string | true): string {
    const content = readFileSync(file, { encoding: enc });
    if (algorithm === true) {
        algorithm = "sha256";
    }
    return sriContent(content, algorithm);
}
