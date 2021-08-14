import { List, ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Tok from './Tok';
import { User, Tiktok, AuthorInfo } from "../types/tok.interface";
import "./TokBrowser.css";
import { createURL } from '../utils/url';
import { RouteName } from '../constants/routes';

function FavoriteToks(props: { favorites: any[]}) {
    const [selectedList, setSelectedList] = useState<any>();
    const [toks, setToks] = useState<any[]>();
    const getList = (listId: number) => {
        fetch(createURL(RouteName.FAVORITE_LIST, [listId]), { method: 'GET' })
            .then(resp => resp.json()
                .then(res => {
                    setToks(res);
                }));
    }
    const handleListItemClick = (event: any, fav: any) => {
        setSelectedList(fav);
    };
    useEffect(() => {
        if (selectedList) {
            getList(selectedList[0]);
        }
    }, selectedList)
    const noFavorites = (<div>
        <h4>No Favorites</h4>
    </div>);
    const favoriteLists =
        (<List component="nav" aria-label="">
            {props.favorites && props.favorites.map((fav, idx) =>
                <ListItem button selected={selectedList && selectedList[0] === fav[0]} onClick={(event) => handleListItemClick(event, fav)}>
                    <ListItemIcon>
                        {/* <Inbox /> */}
                    </ListItemIcon>
                    <ListItemText primary={fav[1]} />
                </ListItem>
            )}
        </List>)
    return (
        <div className='flex flex-column tok-favorites overflow-auto'>
            {props.favorites ? favoriteLists : noFavorites}
        </div>
    );
}

export default FavoriteToks;