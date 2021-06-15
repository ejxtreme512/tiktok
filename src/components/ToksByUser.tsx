import { InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Author, Tiktok } from "../types/tok.interface";
import TokBrowser from './TokBrowser';

function ToksByUser(props: { author?: Author}) {
    const nickname = props.author?.nickname || '';
    const [userName, setUserName] = useState<string>(nickname);
    const [trendCount, setTrendCount] = useState<number>(30);
    const [toks, setToks] = useState<Tiktok[]>([]);

    useEffect(() => {
        let params = new URLSearchParams();
        params.append(`count`, `${trendCount}`);
        fetch('http://127.0.0.1:5000/user', { method: 'GET' }).then(resp => resp.json().then(res => setToks(res)));
    }, []);

    return (
        <div className='flex flex-column tokify pad-5 overflow-auto'>
            <div className='flex'>
                <TextField id="txtSearch" 
                    label="Search Creators" 
                    value={userName} onChange={(evt) => { setUserName(evt.target.value) }} 
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }} />
            </div>
            <TokBrowser toks={toks} title="Trending"></TokBrowser>
        </div>
    );
}

export default ToksByUser;