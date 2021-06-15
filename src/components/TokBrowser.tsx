import { Divider, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Tok from './Tok';
import { Author, Tiktok } from "../types/tok.interface";
import "./TokBrowser.css";

function TokBrowser(props: { toks: Tiktok[], title: string }) {
    const appHistory = useHistory();
    const [filteredToks, setFilteredToks] = useState<Tiktok[]>(props.toks);
    const [toksPerRow, setToksPerRow] = useState<number>(2);
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
    useEffect(() => {
        setFilteredToks(searchToks(searchTerm, props.toks));
    }, [searchTerm]);
    useEffect(() => {
        setFilteredToks(props.toks);
    }, [props.toks]);

    const noToksMatch = (<div>
        <h4>No Toks Match</h4>
    </div>);
    let tokDisplay;


    tokDisplay = filteredToks && filteredToks.length > 0 ? getTokBreakdown(toksPerRow, filteredToks, appHistory) : noToksMatch;

    return (
        <div className='flex flex-column tok-browser overflow-auto'>
            <div className="flex flex-1 overflow-auto">
                <div className="sidebar">
                    <TextField id="txtSearch" label="Filter By Description" value={searchTerm} onChange={handleSearch} variant="outlined" />
                </div>
                <div className="flex-column flex-1 overflow-auto">
                    {tokDisplay}
                </div>
            </div>
        </div>
    );
}

const getTokBreakdown = (toksPerRow: number, filteredToks: Tiktok[], appHistory: any) => {

    const onMoreInfoSelected = (author: Author) => {
        appHistory.push({
            pathname: `/users/${author.uniqueId}`,
            state: {
              update: true, 
            },
          }); 
    }
    const tokRows = [];
    for (let x = 0; x < filteredToks.length; x += toksPerRow) {
        const toks = [];
        for (let y = 0; y < toksPerRow; y++) {
            const location = x + y;
            toks.push(<Tok key={location} tiktok={filteredToks[location]} onMoreInfoSelected={onMoreInfoSelected}></Tok>)
        }
        tokRows.push(<div key={x} className="flex flex-1">{toks}</div>);
    }
    return tokRows;
}

export default TokBrowser;