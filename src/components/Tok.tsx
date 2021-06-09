import { Button, CardActions, CardContent, CardHeader, CardMedia, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

import "./Tok.css"
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Share, Favorite, MoreVert, Save } from '@material-ui/icons';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function Tok(props: any) {
  const [count, setCount] = useState(0);
  console.log(props.tiktok)
  return (
    <div className="tok">
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          action={<IconButton aria-label="settings"><MoreVert /></IconButton>}
          title={props.tiktok.name}
          subheader={props.tiktok.desc}
        />
        <CardMedia
          className=""
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>

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

async function downloadTok(id: number) {
  const a = document.createElement('a');
  a.href = `http://127.0.0.1:5000/download/${id}`
  a.download = 'testabc';
  a.click();
}

export default Tok;