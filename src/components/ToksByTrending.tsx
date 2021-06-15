import { CircularProgress, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Tiktok } from "../types/tok.interface";
import TokBrowser from './TokBrowser';

function ToksByTrending() {
    const [trendCount, setTrendCount] = useState<number>(30);
    const [toks, setToks] = useState<Tiktok[]>([]);
    const handleChange = (evt: any) => setTrendCount(evt.target.value)
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        let params = new URLSearchParams();
        params.append(`count`, `${trendCount}`);
        setLoading(true);
        fetch('http://127.0.0.1:5000/trending', { method: 'GET' })
        .then(resp => resp.json()
        .then((res) => {
            setLoading(false);setToks(res)
        }));
    }, [trendCount]);
    const loadingBar = <div className="flex flex-1 flex-align-center pad-5">
        <CircularProgress />
    </div>;
    const tokBrowser = <div className='flex flex-column tokify pad-5 overflow-auto'>
        <div className='flex'>
            <FormControl variant="outlined" >
                <InputLabel id="trending-count-label">Count</InputLabel>
                <Select labelId="trending-count-label" id="trending-count" value={trendCount} onChange={handleChange} label="Count">
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={60}>60</MenuItem>
                    <MenuItem value={90}>90</MenuItem>
                </Select>
            </FormControl>
        </div>
        <TokBrowser toks={toks} title="Trending"></TokBrowser>
    </div>
    return (
        loading ? loadingBar :
            tokBrowser
    );
}

export default ToksByTrending;