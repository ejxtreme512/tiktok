import { Divider, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ToksByTrending from './ToksByTrending';

function Tokify() {
    return (
        <div className='flex flex-column tokify pad-5 overflow-auto'>
            <div className="flex">
                <h2>Tokify</h2>
            </div>
            <ToksByTrending></ToksByTrending>
        </div>
    );
}

export default Tokify;