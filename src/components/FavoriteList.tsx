import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { RouteName } from '../constants/routes';
import { Favorite } from '../types/tok.interface';
import { createURL } from '../utils/url';
import TokBrowser from './TokBrowser';

function FavoriteList(props: { list: any, userId: number, toks: any[], onFavoritesListUpdated: Function }) {
    const [selectedList, setSelectedList] = useState<Favorite>({ ...props.list });
    const handleEdit = (evt: any) => {
        const curList = { ...selectedList };
        curList.list_name = evt.target.value;
        setSelectedList(curList);
    };
    const createFavoritesList = (listName: string) => {
        let formData = new FormData();
        formData.append('userId', JSON.stringify(props.userId));
        formData.append('listName', listName);
        fetch(createURL(RouteName.ADD_FAVORITES_LIST, []), {
            method: 'POST',
            body: formData
        }).then(resp => resp.json()
            .then(res => {
                //Favorites list updated
            }));
    };
    useEffect(() => {
        setSelectedList({ ...props.list });
    }, [props.list]);

    const tokBrowser = <TokBrowser toks={props.toks} title="" emptyMsg={"No Toks on this List"}></TokBrowser>;
    return (
        <div className='flex flex-column tok-favorite-list pad-5 overflow-auto'>
            <div className="flex">
                <TextField className="flex-1" id="txtSearch" label="Filter By Description" value={selectedList.list_name} onChange={handleEdit} variant="outlined" />
            </div>
            <div className="flex flex-1">
                {tokBrowser};
            </div>
        </div>
    );
}

export default FavoriteList;