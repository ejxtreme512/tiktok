import { Button, CardActions, CardContent, CardHeader, CardMedia, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import "./Tok.css"
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Share, Favorite, MoreVert, Save } from '@material-ui/icons';
import { Tiktok } from '../types/tok';
const useStyles = makeStyles({
  root: {
    maxWidth: 450
  }
});

function Tok(props: { onMoreInfoSelected: any, tiktok: Tiktok }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleViewProfile = () => {
    props.onMoreInfoSelected(props.tiktok.author.id);
    handleClose();
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const menu = (<Menu id="tok-more-info-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
    <MenuItem onClick={handleViewProfile}>User Profile</MenuItem>
  </Menu>);

  return (
    <div className="tok">
      <Card variant="outlined">
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
        <CardContent>
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

    </div>

  );
}

async function downloadTok(id: string) {
  const a = document.createElement('a');
  a.href = `http://127.0.0.1:5000/download/${id}`
  a.download = 'testabc';
  a.click();
}

export default Tok;