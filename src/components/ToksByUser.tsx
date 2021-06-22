import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { RouteName } from '../constants/routes';
import { User, Tiktok } from "../types/tok.interface";
import { createURL } from '../utils/url';
import TokBrowser from './TokBrowser';

function ToksByUser(props: { user?: User }) {
    const params: any = useParams();
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
    const tokBrowser = <TokBrowser toks={toks} title="Creator Videos"></TokBrowser>;
    return <div className='flex flex-column toks-by-user pad-5 overflow-auto'>
        {searchField}
        <div className="flex">
            <p>Creator Info here</p>
        </div>
        {loading ? loadingBar : tokBrowser};
</div>;
}

export default ToksByUser;