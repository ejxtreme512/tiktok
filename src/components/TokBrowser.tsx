import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Tok from './Tok';
import { User, Tiktok } from "../types/tok.interface";
import "./TokBrowser.css";

function TokBrowser(props: { onUserSelected?: Function, toks: Tiktok[], title: string, toksPerRow?: number }) {
    const appHistory = useHistory();
    const [filteredToks, setFilteredToks] = useState<Tiktok[]>(props.toks);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [toksPerRow, setToksPerRow] = useState<number>(props.toksPerRow || 2);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event?.target.value);
    }
    const searchToks = (term: string, toks: Tiktok[]) => {
        if (!term) {
            return toks;
        }
        return toks.filter(tok => tok.desc.toLowerCase().indexOf(term.toLowerCase()) !== -1);
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
    let tokDisplay = filteredToks && filteredToks.length > 0 ? getTokBreakdown(toksPerRow, filteredToks, appHistory, props.onUserSelected) : noToksMatch;
    return (
        <div className='flex flex-column tok-browser overflow-auto'>
            <div className="flex-column flex-1 overflow-auto">
                <div className="flex">
                    <div className="flex flex-1">
                        <TextField className="flex-1" id="txtSearch" label="Filter By Description" value={searchTerm} onChange={handleSearch} variant="outlined" />
                    </div>
                </div>
                <div className="flex-column flex-1 overflow-auto">
                    {tokDisplay}
                </div>
            </div>
        </div>
    );
}

const getTokBreakdown = (toksPerRow: number, filteredToks: Tiktok[], appHistory: any, userSelected?: Function) => {
    const onMoreInfoSelected = (user: User) => {
        userSelected && userSelected(user);
    }
    const tokRows = [];
    for (let x = 0; x < filteredToks.length; x += toksPerRow) {
        const toks = [];
        for (let y = 0; y < toksPerRow; y++) {
            const location = x + y;
            toks.push(<Tok key={location} tiktok={filteredToks[location]} onMoreInfoSelected={onMoreInfoSelected}></Tok>)
        }
        tokRows.push(<div key={x} className="flex flex-1 flex-justify-center">{toks}</div>);
    }
    return tokRows;
}

export default TokBrowser;