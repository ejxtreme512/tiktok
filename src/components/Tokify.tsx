import { Divider, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ToksByTrending from './ToksByTrending';

function Tokify() {
    return (
        <div className='flex flex-column tokify pad-10 overflow-auto'>
            <h2>Welcome to Tokify</h2>
            <ToksByTrending></ToksByTrending>
        </div>
    );
}

export default Tokify;