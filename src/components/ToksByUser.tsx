import { Avatar, CircularProgress, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Badge, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { RouteName } from '../constants/routes';
import { User, Tiktok, AuthorStats } from "../types/tok.interface";
import { createURL } from '../utils/url';
import TokBrowser from './TokBrowser';
import { intToString } from '../utils/number';
import ExpandMoreIcon from '@material-ui/icons/ArrowDownward';
import ExpandLessIcon from '@material-ui/icons/ArrowBack';

function ToksByUser(props: { user?: User, stats?: AuthorStats }) {
    const params: any = useParams();
    const [userCardExpanded, setUserCardExpanded] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const getUserName = (): string => {
        return params.userNameParam || '';
    }
    const [searchUserName, setUserName] = useState<string>(getUserName());
    const [trendCount, setTrendCount] = useState<number>(30);
    const [toks, setToks] = useState<Tiktok[]>([]);
    useEffect(() => {
        if (props.user) {
            setLoading(true);
            fetch(createURL(RouteName.TIKTOKS_BY_USER, [props.user.uniqueId], { count: trendCount }), { method: 'GET' })
                .then(resp => resp.json()
                    .then(res => {
                        setLoading(false);
                        setToks(res);
                    }));
        }
    }, [props.user]);

    useEffect(() => {
        if (!props.user) {
            console.log('fetch info!!')
        }
    }, [searchUserName]);

    const loadingBar = <div className="flex flex-1 flex-align-center pad-5">
        <CircularProgress />
    </div>;
    const emptyDiv = <div></div>;
    const searchField = (<TextField id="txtSearch"
        label="Search Creators"
        value={searchUserName} onChange={(evt) => { setUserName(evt.target.value) }}
        variant="outlined"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <Search />
                </InputAdornment>
            )
        }} />);
    const userDisplayStats = (props.stats ? [
        ["Followers", props.stats?.followerCount],
        ["Following", props.stats?.followingCount],
        ["Likes", props.stats?.heartCount]
    ] : []).map((item) => (<p key={item[0]}>{intToString(item[1] as number)} {item[0]}</p>));
    const handleToggle = () => {
        setUserCardExpanded(!userCardExpanded);
    };
    const userCard = props.user ? (<Card className="flex-1 flex-column" variant="outlined">
        <CardHeader
            action={
                <IconButton aria-label="Toggle Expanded Header" onClick={handleToggle}>
                    {userCardExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            }
            avatar={<Avatar aria-label="avatar" src={props.user.avatarThumb}></Avatar>}
            title={props.user.nickname}
            subheader={props.user.uniqueId}

        />
        {userCardExpanded ? <CardContent className="flex-1">
            <Typography variant="body2" color="textSecondary" component="p">
                {props.user.signature}
            </Typography>
        </CardContent> : ""}

        {userCardExpanded ? <CardActions>
            {userDisplayStats}
        </CardActions> : ""}
    </Card>) : <div></div>;
    const tokBrowser = <TokBrowser toks={toks} title="Creator Videos"></TokBrowser>;
    return <div className='flex flex-column toks-by-user pad-5 overflow-auto'>
        {/* {searchField} */}
        <div className="flex">
            {userCard}
        </div>
        {loading ? loadingBar : tokBrowser};
    </div>;
}

export default ToksByUser;