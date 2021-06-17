import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';


function Selector(props: { label: string, value: any, handleChange: any}) {
return (<div className='flex'>
    <FormControl variant="outlined" >
        <InputLabel id="trending-count-label">{props.label}</InputLabel>
        <Select labelId="trending-count-label" id="trending-count" value={props.value} onChange={props.handleChange} label="Count">
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={60}>60</MenuItem>
            <MenuItem value={90}>90</MenuItem>
        </Select>
    </FormControl>
</div>);
}

export default Selector;