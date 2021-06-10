import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Tiktok } from "../types/tok";
import TokBrowser from './TokBrowser';

function ToksByUser() {
    const [userName, setUserName] = useState<string>('');
    const [trendCount, setTrendCount] = useState<number>(30);
    const [toks, setToks] = useState<Tiktok[]>([]);

    useEffect(() => {
        let params = new URLSearchParams();
        params.append(`count`, `${trendCount}`);
        fetch('http://127.0.0.1:5000/user', {method: 'GET'}).then(resp => resp.json().then(res => setToks(res)));
    }, []);

    return (
        <div className='flex flex-column tokify pad-5 overflow-auto'>
            <div>
                <TextField id="txtSearch" label="Enter a Username" value={userName} onChange={(evt) => { setUserName(evt.target.value)}} variant="outlined" />
            </div>
            <TokBrowser toks={toks} title="Trending"></TokBrowser>
        </div>
    );
}

export default ToksByUser;