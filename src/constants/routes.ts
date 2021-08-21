export enum RouteName {
    ADD_FAVORITES_LIST = "ADD_FAVORITES_LIST",
    DELETE_FAVORITES_LIST = "DELETE_FAVORITES_LIST",
    DOWNLOAD_BY_ID = "DOWNLOAD_BY_ID",
    FAVORITES_LIST = "FAVORITES_LIST",
    TIKTOKS_BY_TRENDING = "TIKTOKS_BY_TRENDING",
    TIKTOKS_BY_USER = "TIKTOKS_BY_USER",
    USER_BY_USERNAME = "USER_BY_USERNAME",
    USER_FAVORITES = "USER_FAVORITES"
};

interface Routes {
    [name: string]: any;
}

export const ROUTES: Routes = {
    [RouteName.ADD_FAVORITES_LIST]: (id: number): string => 'favorites/list',
    [RouteName.DELETE_FAVORITES_LIST]: (id: number): string => `favorites/list/${id}`,
    [RouteName.DOWNLOAD_BY_ID]: (id: number): string => `download/${id}`,
    [RouteName.FAVORITES_LIST]: (id: number): string => `favorites/list/${id}`,
    [RouteName.TIKTOKS_BY_TRENDING]: (): string => 'tiktoks/trending',
    [RouteName.TIKTOKS_BY_USER]: (user: string): string => `tiktoks/${user}`,
    [RouteName.USER_BY_USERNAME]: (user: string): string => `users/${user}`,
    [RouteName.USER_FAVORITES]: (id: number): string => `favorites/user/${id}`
};
