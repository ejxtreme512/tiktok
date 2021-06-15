import { Button, CardActions, CardContent, CardHeader, CardMedia, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import "./Tok.css"
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Share, Favorite, MoreVert, Save } from '@material-ui/icons';
import { Author, Tiktok } from '../types/tok.interface';

function Tok(props: { onMoreInfoSelected: (author: Author) => void, tiktok: Tiktok }) {
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
	const tokInfo = <div className="tok">
		<Card className="flex-1 flex-column" variant="outlined">
			{menu}
			<CardHeader
				avatar={<Avatar aria-label="recipe" src={props.tiktok.author.avatarThumb}></Avatar>}
				action={<IconButton aria-label="settings" onClick={handleClick}><MoreVert /></IconButton>}
				title={props.tiktok.author.nickname}
				subheader=""
			/>
			<CardMedia
				className="auto-height"
				image={props.tiktok.video.cover}
				title=""
			/>
			<CardContent className="flex-1">
				<Typography variant="body2" color="textSecondary" component="p">
					{props.tiktok.desc}
				</Typography>
			</CardContent>

			<CardActions>
				<IconButton color="primary" aria-label="Save" onClick={() => { downloadTok(props.tiktok.id) }}>
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
	return (
		props.tiktok ? tokInfo : <div></div>
	);
}

async function downloadTok(id: string) {
	const a = document.createElement('a');
	a.href = `http://127.0.0.1:5000/download/${id}`
	a.download = 'testabc';
	a.click();
}

export default Tok;