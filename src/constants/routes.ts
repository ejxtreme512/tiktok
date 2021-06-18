export enum RouteName {
    DOWNLOAD_BY_ID = "DOWNLOAD_BY_ID",
    TIKTOKS_BY_TRENDING = "TIKTOKS_BY_TRENDING",
    TIKTOKS_BY_USER = "TIKTOKS_BY_USER"
};

interface Routes {
     [name: string]: any;
}

export const ROUTES: Routes = {
    [RouteName.DOWNLOAD_BY_ID]: (id: number): string  => `download/${id}`,
    [RouteName.TIKTOKS_BY_TRENDING]: (): string => 'tiktoks/trending',
    [RouteName.TIKTOKS_BY_USER]: (user: string): string => `tiktoks/${user}`,
};
