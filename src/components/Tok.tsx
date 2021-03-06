import { Badge, Button, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';

import "./Tok.css"
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Share, Favorite, MoreVert, Save, Chat, ThumbUp } from '@material-ui/icons';
import { Tiktok, AuthorInfo } from '../types/tok.interface';
import { createURL } from '../utils/url';
import { RouteName } from '../constants/routes';
import { intToString } from '../utils/number';

interface TokProps {
	showHeader?: boolean;
	onMoreInfoSelected: (authorInfo: AuthorInfo) => void;
	tiktok: Tiktok;
	onVideoPlay?: Function;
	playingTokId: string;
}
function Tok(props: TokProps) {
	const vidRef = useRef<HTMLVideoElement>(null);
	const [firstPlay, setFirstPlay] = useState<boolean>(true);
	const [isPlaying, setPlaying] = useState<boolean>(false);
	const [ActionEl, setActionEl] = useState<null | HTMLElement>(null);
	const [FavoriteEl, setFavoriteEl] = useState<null | HTMLElement>(null);
	const [expanded, setExpanded] = useState<boolean>(false);
	const [openShareDialog, setOpenShareDialog] = useState<boolean>(false);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setActionEl(event.currentTarget);
	};
	const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		setFavoriteEl(event.currentTarget);
	}
	const handleViewProfile = () => {
		props.onMoreInfoSelected({ user: props.tiktok.author, stats: props.tiktok.authorStats });
		handleClose();
	}
	const handleClose = () => {
		setActionEl(null);
	}
	const handleFavoriteClose = () => {
		setFavoriteEl(null);
	}
	const pauseVideo = () => {
		vidRef.current && vidRef.current.pause();
		setPlaying(false);
	}
	const playVideo = () => {
		vidRef.current && vidRef.current.play();
		setPlaying(true);
	}
	const handleVideoClick = () => {
		if (!isPlaying && firstPlay) {
			playVideo();
			setFirstPlay(false);
		}
	}

	useEffect(() => {
		if (isPlaying && props.playingTokId !== tiktok.id) {
			pauseVideo();
		}
	}, [props.playingTokId]);

	const tiktok = props.tiktok;
	if (!tiktok) {
		return <div></div>;
	}
	const actionMenu = (<Menu id="tok-more-info-menu" anchorEl={ActionEl} keepMounted open={Boolean(ActionEl)} onClose={handleClose}>
		<MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
	</Menu>);
	const favoriteMenu = (<Menu anchorEl={FavoriteEl} open={Boolean(FavoriteEl)} onClose={handleFavoriteClose}>
	</Menu>);
	const handleDialogClose = () => {
		setOpenShareDialog(false);
	}
	const shareDialog = (
		<Dialog open={openShareDialog} onClose={handleDialogClose} aria-labelledby="Share Dialog" maxWidth={"md"}>
			<DialogTitle>Share</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{tiktok.id}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDialogClose} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
	const onVideoPlay = () => {
		setPlaying(true);
		if (props.onVideoPlay) {
			props.onVideoPlay(tiktok.id);
		}
	}
	const tokInfo = <div className="tok">
		<Card className="flex-1 flex-column" variant="outlined">
			{actionMenu}
			{favoriteMenu}
			{props.showHeader !== false ? <CardHeader
				avatar={<Avatar aria-label="recipe" src={tiktok.author.avatarThumb}></Avatar>}
				action={<IconButton aria-label="settings" onClick={handleClick}><MoreVert /></IconButton>}
				title={tiktok.author.nickname}
				subheader=""
			/> : ''
			}
			<video ref={vidRef} onClick={handleVideoClick} className="auto-height video-player" onPlay={onVideoPlay} poster={tiktok.video.cover} controls preload="none">
				<source src={streamTok(tiktok.id)} type="video/mp4" />
			</video>
			<CardContent className="flex-1">
				<Typography variant="body2" color="textSecondary" component="p">
					{tiktok.desc}
				</Typography>
			</CardContent>

			<CardActions>
				<IconButton color="primary" aria-label="Save" onClick={() => { downloadTok(tiktok.id) }}>
					<Save />
				</IconButton>
				<IconButton aria-label="Share link" onClick={() => setOpenShareDialog(true)}>
					<Share />
				</IconButton>
				<IconButton aria-label="Add to favorites" onClick={handleFavorite}>
					<Favorite />
				</IconButton>
				<div className="flex-1"></div>
				<Badge className="margin-left-10 margin-right-10" badgeContent={intToString(tiktok.stats.diggCount)} max={10000} color="primary">
					<ThumbUp />
				</Badge>
				<Badge className="margin-left-10 margin-right-10" badgeContent={intToString(tiktok.stats.commentCount)} max={10000} color="primary">
					<Chat />
				</Badge>
			</CardActions>
		</Card>
		{shareDialog}
	</div>;
	return tokInfo;
}

const addFavorite = (id: string) => {
	console.log('add favorite');
}

function streamTok(id: string) {
	return createURL(RouteName.DOWNLOAD_BY_ID, [id]);
}

async function downloadTok(id: string) {
	const a = document.createElement('a');
	a.href = createURL(RouteName.DOWNLOAD_BY_ID, [id]);
	a.download = 'testabc';
	a.click();
}

export default Tok;