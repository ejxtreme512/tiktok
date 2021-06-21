import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RouteName } from '../constants/routes';
import { User, Tiktok } from "../types/tok.interface";
import { createURL } from '../utils/url';
import TokBrowser from './TokBrowser';

function ToksByUser(props: { author?: User }) {
    const params: any = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [author, setAuthor] = useState<User | null>(props.author || null);
    const getUserName = (): string => {
        if (params.userNameParam) {
            return params.userNameParam;
        }
        return author?.uniqueId || ''
    }
    const [derivedUserName, setUserName] = useState<string>(getUserName());
    const [trendCount, setTrendCount] = useState<number>(30);
    const [toks, setToks] = useState<Tiktok[]>([]);
    useEffect(() => {
        if (derivedUserName) {
            setLoading(true);
            fetch(createURL(RouteName.TIKTOKS_BY_USER, [derivedUserName], { count: trendCount }), { method: 'GET' })
                .then(resp => resp.json()
                    .then(res => {
                        setLoading(false);
                        setToks(res)
                    }));
        }
    }, [author]);

    useEffect(() => {
        if (!author) {
            fetch(createURL(RouteName.USER_BY_USERNAME, [derivedUserName]), { method: 'GET' })
                .then(resp => resp.json())
                .then(res => {
                    setAuthor(res.userInfo.user);
                });
        }
    }, [derivedUserName]);
    const loadingBar = <div className="flex flex-1 flex-align-center pad-5">
        <CircularProgress />
    </div>;
    const emptyDiv = <div></div>;
    const searchField =  (<TextField id="txtSearch"
    label="Search Creators"
    value={derivedUserName} onChange={(evt) => { setUserName(evt.target.value) }}
    variant="outlined"
    InputProps={{
        startAdornment: (
            <InputAdornment position="start">
                <Search />
            </InputAdornment>
        )
    }} />);
    const userToks = <div className='flex flex-column toks-by-user pad-5 overflow-auto'>
        {searchField}
        <div className="flex">
            <p>Creator Info here</p>
        </div>
        {toks && toks.length ? <TokBrowser toks={toks} title="Creator Videos"></TokBrowser> : emptyDiv};
    </div>;
    return (
        loading ? loadingBar :
            userToks
    );
}

export default ToksByUser;