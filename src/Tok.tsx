import { Button, CardActions, CardHeader, makeStyles } from '@material-ui/core';
import { useState } from 'react';

import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function Tok(props: any) {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          action={<IconButton aria-label="settings"></IconButton>}
          title={props.tiktok.name}
          subheader={props.tiktok.desc}
        />

        <CardActions>
          <Button size="small" color="primary">
            Share
        </Button>
          <Button size="small" color="primary" onClick={() => { downloadTok(props.tiktok.id) }}>
            Download
        </Button>
          <Button size="small" color="primary">
            Favorite
        </Button>
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