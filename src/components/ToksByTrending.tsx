import { Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Tiktok } from "../types/tok";
import TokBrowser from './TokBrowser';

function ToksByTrending() {
    const [trendCount, setTrendCount] = useState<number>(30);
    const [toks, setToks] = useState<Tiktok[]>([]);
    const handleChange = (evt: any) => setTrendCount(evt.target.value)
    useEffect(() => {
        let params = new URLSearchParams();
        params.append(`count`, `${trendCount}`);
        fetch('http://127.0.0.1:5000/trending', { method: 'GET' }).then(resp => resp.json().then(res => setToks(res)));
    }, []);

    return (
        <div className='flex flex-column tokify pad-5 overflow-auto'>
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
    );
}

export default ToksByTrending;