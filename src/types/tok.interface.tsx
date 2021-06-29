export interface Tiktok {
    "author": User;
    "authorStats": AuthorStats;
    "createTime": number,
    "desc": string,
    "digged": string,
    "duetEnabled": string,
    "duetInfo": {
        "duetFromId": string
    },
    "forFriend": boolean,
    "id": string,
    "isAd": boolean,
    "isFavorite"?: boolean,
    "itemCommentStatus": number,
    "itemMute": boolean,
    "music": Music
    "officalItem": boolean,
    "originalItem": boolean,
    "privateItem": false,
    "secret": false,
    "shareEnabled": true,
    "showNotPass": false,
    "stats": Stats,
    "stickersOnItem": [
        {
            "stickerText": [
                "Love Is Gone",
                "Battle"
            ],
            "stickerType": 4
        }
    ],
    "stitchEnabled": boolean,
    "video": {
        "bitrate": number,
        "cover": string,
        "downloadAddr": string,
        "duration": number,
        "dynamicCover": string,
        "encodeUserTag": string,
        "encodedType": string,
        "format": string,
        "height": number,
        "id": string,
        "originCover": string,
        "playAddr": string,
        "ratio": string,
        "reflowCover": string,
        "shareCover": string[],
        "videoQuality": string,
        "width": number
    },
    "vl1": boolean
}

export interface User {
    "avatarLarger": string
    "avatarMedium": string,
    "avatarThumb": string;
    "commentSetting": number,
    "duetSetting": number,
    "ftc": boolean,
    "id": string,
    "nickname": string,
    "openFavorite": boolean,
    "privateAccount": boolean,
    "relation": number,
    "secUid": string,
    "secret": boolean,
    "signature": string
    "stitchSetting": number,
    "uniqueId": string,
    "verified": boolean
}

export interface Music {
    "album": string,
    "authorName": string,
    "coverLarge": string,
    "coverMedium": string,
    "coverThumb": string,
    "duration": number,
    "id": string,
    "original": boolean,
    "playUrl": string,
    "title": string
}

export interface AuthorStats {
    "diggCount": number;
    "followerCount": number;
    "followingCount": number;
    "heart": number;
    "heartCount": number;
    "videoCount": number;
}

export interface Stats {
    "commentCount": number;
    "diggCount": number;
    "playCount": number;
    "shareCount": number;
}

export interface AuthorInfo {
    user: User;
    stats: AuthorStats;
}