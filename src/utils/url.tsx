export function createURL(address: string, params: any[]) {
    const urlObj = new URL('address');
    const urlParams = new URLSearchParams(address).toString();
    return urlObj
}