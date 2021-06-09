import { Divider, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Tok from './Tok';
import { Tiktok } from "../types/tok";

function TokBrowser(props: {toks: Tiktok[], title: string}) {
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

    useEffect(() => {
        setFilteredToks(searchToks(searchTerm, props.toks));
    }, [searchTerm]);
    useEffect(() => {
        setFilteredToks(props.toks);
    }, [props.toks]);
    return (
        <div className='flex flex-column tok-browser overflow-auto'>
            <h3>{props.title}</h3>
            <div>
                <TextField id="txtSearch" label="Filter By Description" value={searchTerm} onChange={handleSearch} variant="outlined" />
            </div>
            <div className='flex-column overflow-auto margin-left-auto margin-right-auto'>
                {filteredToks.map((tok, index) => (
                    <div key={index}>
                        <Tok tiktok={tok}></Tok>
                        <Divider />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TokBrowser;