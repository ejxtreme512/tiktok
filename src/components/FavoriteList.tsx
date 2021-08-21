import { TextField } from '@material-ui/core';
import { SyntheticEvent, useEffect, useState } from 'react';
import TokBrowser from './TokBrowser';

function FavoriteList(props: { list: any, userId: number, toks: any[] }) {
    const [selectedList, setSelectedList] = useState<any>({ ...props.list });
    const handleEdit = (evt: SyntheticEvent) => {
        const curList = {...selectedList};
        curList.name = evt.target;
        setSelectedList(curList);
    }
    const tokBrowser = <TokBrowser toks={props.toks} title=""></TokBrowser>;
    return (
        <div className='flex flex-column tok-favorite-list overflow-auto'>
            <div className="flex flex-1">
                <TextField className="flex-1" id="txtSearch" label="Filter By Description" value={selectedList[1]} onChange={handleEdit} variant="outlined" />
            </div>
        </div>
    );
}

export default FavoriteList;