import { Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Tok from './Tok';

interface Tiktok {
    name: string;
    id: number;
}

function Tokify() {
    const [toks, setToks] = useState<Tiktok[]>([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/trending').then(resp => resp.json().then(res => setToks(res)));
    }, []);
    return (
        <div className='flex flex-column tokify overflow-auto'>
            <h3>Trending</h3>
            <div className='flex-column overflow-auto'>
                {toks.map((tok, index) => (
                    <div key={index}>
                        <Tok  tiktok={tok}></Tok>
                        <Divider />
                    </div>
                ))}
                <Divider />
            </div>
        </div>
    );
}

export default Tokify;