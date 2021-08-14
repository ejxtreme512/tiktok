import { CircularProgress, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Tok from './Tok';
import { User, Tiktok, AuthorInfo } from "../types/tok.interface";
import "./TokBrowser.css";
import { createURL } from '../utils/url';
import { RouteName } from '../constants/routes';
import TokBrowser from './TokBrowser';

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
    }
    const handleListItemClick = (event: any, fav: any) => {
        setSelectedList(fav);
    };
    const createFavoritesList = () => {
        const data = {
            userId: props.userId,
            listName: 'New List'
        };
        fetch(createURL(RouteName.ADD_FAVORITES_LIST, []), {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(resp => resp.json()
                .then(res => {
                    //Favorites list updated
                }));
    }
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
            {props.favorites && props.favorites.map((fav, idx) =>
                <ListItem key={idx} button selected={selectedList && selectedList[0] === fav[0]} onClick={(event) => handleListItemClick(event, fav)}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary={fav[1]} />
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
                <h5>Favorites List</h5>
                <IconButton color="primary" aria-label="Add new favorites list" onClick={() => { createFavoritesList() }}>
                    <AddIcon />
				</IconButton>
                {props.favorites ? favoriteLists : noFavorites}
            </div>
            {selectedList ? tokBrowser : <h5>Select a list to view Tiktoks</h5>}
        </div>
    );
}

export default FavoriteToks;