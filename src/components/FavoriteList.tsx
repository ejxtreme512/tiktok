import { Button, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Favorite } from '../types/tok.interface';
import TokBrowser from './TokBrowser';

function FavoriteList(props: { list: any, userId: number, toks: any[], onDeleteList: Function, onEditList: Function }) {
    const [selectedList, setSelectedList] = useState<Favorite>({ ...props.list });
    const handleEdit = (evt: any) => {
        const curList = { ...selectedList };
        curList.list_name = evt.target.value;
        setSelectedList(curList);
    };
    const handleSave = () => {
        props.onEditList(selectedList);
    }
    const handleDelete = () => {
        props.onDeleteList(selectedList);
    }
    useEffect(() => {
        setSelectedList({ ...props.list });
    }, [props.list]);

    const tokBrowser = <TokBrowser toks={props.toks} title="" emptyMsg={"No Toks on this List"}></TokBrowser>;
    return (
        <div className='flex flex-column tok-favorite-list pad-5 overflow-auto'>
            <div className="flex">
                <TextField className="flex-1" id="txtSearch" label="Filter By Description" value={selectedList.list_name} onChange={handleEdit} variant="outlined" />
            </div>
            <div className="flex flex-row-reverse">
                <Button onClick={handleDelete} color="primary">
                    Delete
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </div>
            <div className="flex flex-1">
                {tokBrowser}
            </div>
        </div>
    );
}

export default FavoriteList;