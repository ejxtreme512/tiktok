import { CircularProgress, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import "./TokBrowser.css";
import { createURL } from '../utils/url';
import { RouteName } from '../constants/routes';
import TokBrowser from './TokBrowser';
import FavoriteList from './FavoriteList';
import { Tiktok } from '../types/tok.interface';

function FavoriteToks(props: { favorites: any[], userId: number }) {
    const [selectedList, setSelectedList] = useState<any>();
    const [toks, setToks] = useState<Tiktok[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const getList = (listId: number) => {
        setLoading(true);
        fetch(createURL(RouteName.FAVORITES_LIST, [listId]), { method: 'GET' })
            .then(resp => resp.json()
                .then(res => {
                    setToks(res);
                    setLoading(false);
                }));
    };
    const handleListItemClick = (event: any, fav: any) => {
        setSelectedList(fav);
    };
    const createFavoritesList = () => {
        let formData = new FormData();
        formData.append('userId', JSON.stringify(props.userId));
        formData.append('listName', 'New List');
        fetch(createURL(RouteName.ADD_FAVORITES_LIST, []), {
            method: 'POST',
            body: formData
        }).then(resp => resp.json()
            .then(res => {
                //Favorites list updated
            }));
    };
    const onDeleteList = (list: any) => {
        fetch(createURL(RouteName.DELETE_FAVORITES_LIST, []), {
            method: 'DELETE'
        })
    };
    useEffect(() => {
        if (props.favorites && selectedList) {
            getList(selectedList[0]);
        }
    }, selectedList)
    const noFavorites = (<div>
        <h4>No Favorites</h4>
    </div>);
    const favoriteLists =
        (<List component="nav" aria-label="">
            {props.favorites && props.favorites.map((favList, idx) =>
                <ListItem key={idx} button selected={selectedList && selectedList[0] === favList[0]} onClick={(event) => handleListItemClick(event, favList)}>
                    <ListItemIcon>
                        <IconButton color="primary" aria-label="Delete list" onClick={() => { onDeleteList(favList) }}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText primary={favList[1]} />
                </ListItem>
            )}
        </List>)
    const loadingBar = <div className="flex flex-1 flex-align-center pad-5">
        <CircularProgress />
    </div>;
    const tokBrowser = loading ? loadingBar : (<TokBrowser toks={toks} title=""></TokBrowser>);
    return (
        <div className='flex flex-column tok-favorites overflow-auto'>
            <div>
                <div className="flex">
                    <h5>Favorites List</h5>
                    <IconButton color="primary" aria-label="Add new favorites list" onClick={() => { createFavoritesList() }}>
                        <AddIcon />
                    </IconButton>
                </div>
                {props.favorites ? favoriteLists : noFavorites}
            </div>
            {selectedList ? <FavoriteList list={selectedList} userId={props.userId} toks={[]}></FavoriteList> : <h5>Select a list to view Tiktoks</h5>}
        </div>
    );
}

export default FavoriteToks;