import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Favorite } from '../types/tok.interface';
import TokBrowser from './TokBrowser';

function FavoriteList(props: { list: any, userId: number, toks: any[] }) {
    const [selectedList, setSelectedList] = useState<Favorite>({ ...props.list });
    const handleEdit = (evt: any) => {
        const curList = { ...selectedList };
        curList.list_name = evt.target.value;
        setSelectedList(curList);
    };
    useEffect(() => {
        setSelectedList({ ...props.list });
    }, [props.list])
    const tokBrowser = <TokBrowser toks={props.toks} title=""></TokBrowser>;
    return (
        <div className='flex flex-column tok-favorite-list overflow-auto'>
            <div className="flex flex-1">
                <TextField className="flex-1" id="txtSearch" label="Filter By Description" value={selectedList.list_name} onChange={handleEdit} variant="outlined" />
            </div>
        </div>
    );
}

export default FavoriteList;