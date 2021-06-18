import { CardActions, CardContent, CardHeader, CardMedia, Menu, MenuItem, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import "./Tok.css"
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Share, Favorite, MoreVert, Save } from '@material-ui/icons';
import { User, Tiktok } from '../types/tok.interface';
import { createURL } from '../utils/url';
import { RouteName } from '../constants/routes';

function Tok(props: { onMoreInfoSelected: (author: User) => void, tiktok: Tiktok }) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [expanded, setExpanded] = useState<boolean>(false);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleViewProfile = () => {
		props.onMoreInfoSelected(props.tiktok.author);
		handleClose();
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const menu = (<Menu id="tok-more-info-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
		<MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
	</Menu>);
	const tiktok = props.tiktok;
	if (!tiktok) {
		return <div></div>;
	}
	const tokInfo = <div className="tok">
		<Card className="flex-1 flex-column" variant="outlined">
			{menu}
			<CardHeader
				avatar={<Avatar aria-label="recipe" src={tiktok.author.avatarThumb}></Avatar>}
				action={<IconButton aria-label="settings" onClick={handleClick}><MoreVert /></IconButton>}
				title={tiktok.author.nickname}
				subheader=""
			/>
			<CardMedia
				className="auto-height"
				image={tiktok.video.cover}
				title=""
			/>
			<CardContent className="flex-1">
				<Typography variant="body2" color="textSecondary" component="p">
					{tiktok.desc}
				</Typography>
			</CardContent>

			<CardActions>
				<IconButton color="primary" aria-label="Save" onClick={() => { downloadTok(tiktok.id) }}>
					<Save />
				</IconButton>
				<IconButton aria-label="Share link">
					<Share />
				</IconButton>
				<IconButton aria-label="Add to favorites">
					<Favorite />
				</IconButton>
			</CardActions>
		</Card>
	</div>;
	return tokInfo;
}

async function downloadTok(id: string) {
	const a = document.createElement('a');
	a.href = createURL(RouteName.DOWNLOAD_BY_ID, [id]);
	a.download = 'testabc';
	a.click();
}

export default Tok;