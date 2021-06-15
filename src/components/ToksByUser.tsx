import { InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Author, Tiktok } from "../types/tok.interface";
import TokBrowser from './TokBrowser';

function ToksByUser(props: { author?: Author }) {
    const location = useLocation();
    const params: any = useParams();
    const getUserName = (): string => {
        if (params.userNameParam) {
            return params.userNameParam;
        }
        return props.author?.uniqueId || ''
    }
    const [derivedUserName, setUserName] = useState<string>(getUserName());
    const [trendCount, setTrendCount] = useState<number>(30);
    const [toks, setToks] = useState<Tiktok[]>([]);
    useEffect(() => {
        if (derivedUserName) {
            console.log(derivedUserName)
            fetch(`http://127.0.0.1:5000/users/${derivedUserName}`, { method: 'GET' }).then(resp => resp.json().then(res => setToks(res)));
        }
    }, [props.author]);

    useEffect(() => {
        if (!props.author) {
            console.log('author info not found, fetch it!');
        }
    }, [derivedUserName]);
    const emptyDiv = <div></div>
    const userToks = <div className='flex flex-column toks-by-user pad-5 overflow-auto'>
        <div className='flex'>
            <TextField id="txtSearch"
                label="Search Creators"
                value={derivedUserName} onChange={(evt) => { setUserName(evt.target.value) }}
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    )
                }} />
        </div>
        {toks ? <TokBrowser toks={toks} title="Creator Videos"></TokBrowser> : emptyDiv};
    </div>;
    return userToks;
}

export default ToksByUser;