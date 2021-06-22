import { CircularProgress, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RouteName, ROUTES } from '../constants/routes';
import { Tiktok } from "../types/tok.interface";
import { createURL } from '../utils/url';
import TokBrowser from './TokBrowser';

function ToksByTrending(props: { onUserSelected: Function}) {
    const [trendCount, setTrendCount] = useState<number>(30);
    const [toks, setToks] = useState<Tiktok[]>([]);
    const handleChange = (evt: any) => setTrendCount(evt.target.value)
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        let params = new URLSearchParams();
        params.append(`count`, `${trendCount}`);
        setLoading(true);
        const url = createURL(RouteName.TIKTOKS_BY_TRENDING, [], { count: trendCount });
        fetch(url, { method: 'GET' })
            .then(resp => resp.json()
                .then((res) => {
                    setLoading(false); setToks(res)
                }));
    }, [trendCount]);
    const loadingBar = <div className="flex flex-1 flex-align-center pad-5">
        <CircularProgress />
    </div>;
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
        { loading ? loadingBar :
            <TokBrowser toks={toks} title="Trending" onUserSelected={props.onUserSelected}></TokBrowser>}
        </div>
    );
}

export default ToksByTrending;