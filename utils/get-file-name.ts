export function extractBaseName(path: string): string {
    let fileName = path.match(/\/([^\/]+)$/);
    if (fileName && fileName[1]) {
        return fileName[1].split('.')[0];
    } else {
        return "";
    }
}
