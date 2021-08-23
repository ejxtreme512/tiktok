import { CircularProgress, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import "./TokBrowser.css";
import { createURL } from '../utils/url';
import { RouteName } from '../constants/routes';
import TokBrowser from './TokBrowser';
import { Favorite, Tiktok } from '../types/tok.interface';
import FavoriteList from './FavoriteList';

function FavoriteToks(props: { favorites: any[], userId: number, onDeleteList: Function, onEditList: Function }) {
    const [selectedList, setSelectedList] = useState<Favorite>();
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
        const newList = {
            list_id: -1,
            user_id: props.userId,
            list_name: 'New List'
        };
        setSelectedList(newList);
    };
    useEffect(() => {
        if (props.favorites && selectedList) {
            getList(selectedList.list_id);
        }
    }, [selectedList])
    const noFavorites = (<div>
        <h4>No Favorites</h4>
    </div>);
    const favoriteLists =
        (<List component="nav" aria-label="">
            {props.favorites && props.favorites.map((favList: Favorite, idx) =>
                <ListItem key={idx} button selected={selectedList && selectedList.list_id === favList.list_id} onClick={(event) => handleListItemClick(event, favList)}>
                    {/* <ListItemIcon>
                        <IconButton color="primary" aria-label="Delete list" onClick={() => { props.onDeleteList(favList) }}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemIcon> */}
                    <ListItemText primary={favList.list_name} />
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
            {selectedList ? <FavoriteList list={selectedList} userId={props.userId} onDeleteList={props.onDeleteList} onEditList={props.onEditList} toks={[]}></FavoriteList> : <h5>Select a list to view Tiktoks</h5>}
        </div>
    );
}

export default FavoriteToks;