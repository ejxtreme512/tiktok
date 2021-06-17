export const ROUTES = {
    DOWNLOAD_BY_ID: (id: number) => `/download/${id}`,
    TIKTOKS_BY_TRENDING: () => '/tiktoks/trending',
    TIKTOKS_BY_USER: (user: string) => `tiktoks/${user}`,

}