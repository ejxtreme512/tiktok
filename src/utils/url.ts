import { RouteName, ROUTES } from "../constants/routes";


export function createURL(route: RouteName, routeArgs: any = [], params?: any[]) {
    const env = '127.0.0.1:500/';
    const routeAddress = ROUTES[route](...(routeArgs || []));
    // const urlObj = new URL(address);
    // if (params) {
    //     const urlParams = new URLSearchParams(address).toString();
    // }
    // return urlObj.toString();
}