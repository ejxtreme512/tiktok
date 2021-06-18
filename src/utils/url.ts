import { ROUTES } from "../constants/routes";

export function createURL(route: any, routeArgs: any[] = [], paramArgs?: any) {
    const pieces = [];
    const base = '127.0.0.1:500/';
    const routeAddress = ROUTES[route](...routeArgs);
    const params = new URLSearchParams("");
    pieces.push(base, routeAddress);
    for(let key in paramArgs) {
        params.append(key, paramArgs[key]);
    }
    if (Object.keys(paramArgs).length > 0) {
        pieces.push('?' + params.toString());
    }
    return pieces.join('');
}