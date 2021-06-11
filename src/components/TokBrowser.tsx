import { Divider, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Tok from './Tok';
import { Tiktok } from "../types/tok";
import "./TokBrowser.css";

function TokBrowser(props: { toks: Tiktok[], title: string }) {
    const [filteredToks, setFilteredToks] = useState<Tiktok[]>(props.toks);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event?.target.value);
    }
    const searchToks = (term: string, toks: Tiktok[]) => {
        if (!term) {
            return toks;
        }
        return toks.filter(tok => tok.desc.toLowerCase().indexOf(term.toLowerCase()) !== -1);
    }
    const onMoreInfoSelected = (id: string) => {
        console.log(id);
    }
    useEffect(() => {
        setFilteredToks(searchToks(searchTerm, props.toks));
    }, [searchTerm]);
    useEffect(() => {
        setFilteredToks(props.toks);
    }, [props.toks]);
    const noToksMatch = (<div>
        <h4>No Toks Match</h4>
    </div>);
    const tokDisplay = filteredToks && filteredToks.length ? filteredToks.map((tok, index) => (
        <div key={index}>
            <Tok tiktok={tok} onMoreInfoSelected={onMoreInfoSelected}></Tok>
        </div>
    )) : noToksMatch;
    return (
        <div className='flex flex-column tok-browser overflow-auto'>
            <div className="flex flex-1 overflow-auto">
                <div className="sidebar">
                    <TextField id="txtSearch" label="Filter By Description" value={searchTerm} onChange={handleSearch} variant="outlined" />
                </div>
                <div className="flex-column flex-1 overflow-auto tok-display">
                    {tokDisplay}
                </div>
            </div>
        </div>
    );
}

export default TokBrowser;