import { Divider, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Tiktok } from "../types/tok";
import TokBrowser from './TokBrowser';

function ToksByTrending() {
    const [trendCount, setTrendCount] = useState<number>(30);
    const [toks, setToks] = useState<Tiktok[]>([]);

    useEffect(() => {
        let params = new URLSearchParams();
        params.append(`count`, `${trendCount}`);
        fetch('http://127.0.0.1:5000/trending', {method: 'GET'}).then(resp => resp.json().then(res => setToks(res)));
    }, []);

    return (
        <div className='flex flex-column tokify pad-10 overflow-auto'>
            <TokBrowser toks={toks} title="Trending"></TokBrowser>
        </div>
    );
}

export default ToksByTrending;