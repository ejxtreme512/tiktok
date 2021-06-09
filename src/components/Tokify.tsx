import { Divider, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Tok from './Tok';
import { Tiktok } from "../types/tok";

function Tokify() {
    const [trendCount, setTrendCount] = useState<number>(30);
    const [toks, setToks] = useState<Tiktok[]>([]);
    const [filteredToks, setFilteredToks] = useState<Tiktok[]>(toks);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event?.target.value);
    }
    const searchToks = (term: string, toks: Tiktok[]) => {
        if (!term) {
            return toks;
        }
        return toks.filter(tok => tok.desc.indexOf(term) !== -1);
    }
    useEffect(() => {
        let params = new URLSearchParams();
        params.append(`count`, `${trendCount}`);
        fetch('http://127.0.0.1:5000/trending', {method: 'GET'}).then(resp => resp.json().then(res => setToks(res)));
        // const toks = [{ name: 'abc', desc: 'this is the description', id: 1 }, { name: 'def', desc: 'lol', id: 2 }];
        // setToks(toks);
    }, []);
    useEffect(() => {
        setFilteredToks(searchToks(searchTerm, toks));
    }, [searchTerm]);
    useEffect(() => {
        setFilteredToks(toks);
    }, [toks]);
    return (
        <div className='flex flex-column tokify pad-10 overflow-auto'>
            <h3>Trending</h3>
            <div>
                <TextField id="txtSearch" label="Search" value={searchTerm} onChange={handleSearch} variant="outlined" />
            </div>
            <div className='flex-column overflow-auto margin-left-auto margin-right-auto'>
                {filteredToks.map((tok, index) => (
                    <div key={index}>
                        <Tok tiktok={tok}></Tok>
                        <Divider />
                    </div>
                ))}
                <Divider />
            </div>
        </div>
    );
}



export default Tokify;