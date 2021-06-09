export interface Tiktok {
    "author": Author;
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
    "stitchEnabled": true,
    "video": {
        "bitrate": 499097,
        "cover": "https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/7d6868635eed458ca14d1314cc9da1ef?x-expires=1623218400&x-signature=J7a%2FOYEEWU%2FajaMO0EtcU3fLKC4%3D",
        "downloadAddr": "https://v16.tiktokcdn.com/271d442c72dcafa08843740c3eeacd9f/60c05ce8/video/tos/alisg/tos-alisg-pve-0037/e4b6bc9ff9d04f36af9a86b2ac8de3a2/?a=1180&br=974&bt=487&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=3&ds=3&er=&l=202106090016440102341091966702886C&lr=tiktok&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M21zZTtlcDU4NDMzPDgzM0ApOGdoZDc0N2RkN2Y4M2hpOGc2LWotNm8vNDZgLS0yLzRzczMuLjNfL2M2NjQzL19gMV46Yw%3D%3D&vl=&vr=",
        "duration": 27,
        "dynamicCover": "https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/e45b35dd39f245bf8237bc56701bb070_1616008156?x-expires=1623218400&x-signature=2VtUnQ%2Bpdx9cC4nDCwMlohTaxow%3D",
        "encodeUserTag": "",
        "encodedType": "normal",
        "format": "mp4",
        "height": 1246,
        "id": "6940702147763801346",
        "originCover": "https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/2115c738c0aa423b8ddb94e6824b3e50_1616008156?x-expires=1623218400&x-signature=lIJ7wWo%2FmFygJ7ONUFYcNWwORoE%3D",
        "playAddr": "https://v16.tiktokcdn.com/271d442c72dcafa08843740c3eeacd9f/60c05ce8/video/tos/alisg/tos-alisg-pve-0037/e4b6bc9ff9d04f36af9a86b2ac8de3a2/?a=1180&br=974&bt=487&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=3&ds=3&er=&l=202106090016440102341091966702886C&lr=tiktok&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M21zZTtlcDU4NDMzPDgzM0ApOGdoZDc0N2RkN2Y4M2hpOGc2LWotNm8vNDZgLS0yLzRzczMuLjNfL2M2NjQzL19gMV46Yw%3D%3D&vl=&vr=",
        "ratio": "720p",
        "reflowCover": "https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/7d6868635eed458ca14d1314cc9da1ef?x-expires=1623218400&x-signature=J7a%2FOYEEWU%2FajaMO0EtcU3fLKC4%3D",
        "shareCover": [
            "",
            "https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/2115c738c0aa423b8ddb94e6824b3e50_1616008156~tplv-tiktok-play.jpeg?x-expires=1623218400&x-signature=87WzPAyO4ndm3K7fuYiFIb2fW%2Bw%3D",
            "https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/2115c738c0aa423b8ddb94e6824b3e50_1616008156~tplv-tiktok-play2.jpeg?x-expires=1623218400&x-signature=X1E0Dd7jsgZcLXsIEI1ygpk4iuE%3D"
        ],
        "videoQuality": "normal",
        "width": 576
    },
    "vl1": false
}

export interface Author {
    "avatarLarger": string
    "avatarMedium": string,
    "avatarThumb": string;
    "commentSetting": 0,
    "duetSetting": 0,
    "ftc": false,
    "id": "6551685763258580994",
    "nickname": "TMM_SamiR",
    "openFavorite": false,
    "privateAccount": false,
    "relation": 0,
    "secUid": "MS4wLjABAAAAFgb1DcISegB2Cs9u_Cf7OlTo9jJC6Av3gBAM-ADPmaKzNc1vj3Hdjcr8aCFvw5Cv",
    "secret": false,
    "signature": string
    "stitchSetting": number,
    "uniqueId": "samirbae8",
    "verified": false
}

export interface Music {
    "album": "",
    "authorName": "TMM_SamiR",
    "coverLarge": "https://p16-sign-sg.tiktokcdn.com/aweme/1080x1080/tos-alisg-avt-0068/ff86b01165bf2ade441a74d8482ab3ec.jpeg?x-expires=1623283200&x-signature=UnanKXtcxbZdAoA2QR1Sxwmojhc%3D",
    "coverMedium": "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/ff86b01165bf2ade441a74d8482ab3ec.jpeg?x-expires=1623283200&x-signature=QhDQgs%2BVfEvg%2F3qbvv%2BWudkvurw%3D",
    "coverThumb": "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/ff86b01165bf2ade441a74d8482ab3ec.jpeg?x-expires=1623283200&x-signature=JoMr0QRMGU4At5CKJmo3c2ruiAU%3D",
    "duration": 27,
    "id": "6940702108383447810",
    "original": true,
    "playUrl": "https://sf16-ies-music-sg.tiktokcdn.com/obj/tiktok-obj/6940702037931821825.mp3",
    "title": "original sound - TMM_SamiR"
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