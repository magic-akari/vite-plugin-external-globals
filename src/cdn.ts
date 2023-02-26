export type CDN = (name: string, version: string, path: string) => string;

export function jsdelivr(name: string, version: string, path: string): string {
    return `//cdn.jsdelivr.net/npm/${name}@${version}/${path}`;
}

export function unpkg(name: string, version: string, path: string): string {
    return `//unpkg.com/${name}@${version}/${path}`;
}

export function cdnjs(name: string, version: string, path: string): string {
    return `//cdnjs.cloudflare.com/ajax/libs/${name}/${version}/${path}`;
}
