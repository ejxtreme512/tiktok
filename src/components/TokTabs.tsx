import { Fragment, useEffect, useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import ToksByTrending from "./ToksByTrending";
import ToksByUser from "./ToksByUser";
import { Divider } from '@material-ui/core';
import { AuthorInfo, AuthorStats, Favorite, User } from "../types/tok.interface";
import { createURL } from "../utils/url";
import { RouteName } from "../constants/routes";
import FavoriteToks from "./FavoriteToks";

function TokTabs() {
    const allTabs = ['/trending', '/users', '/favorites'];
    const appHistory = useHistory();
    const userId = 1;
    const [selectedUser, setSelectedUser] = useState<User>();
    const [selectedUserStats, setSelectedUserStats] = useState<AuthorStats>();
    const [userFavoriteLists, setUserFavoriteLists] = useState<any>();
    const getLocation = (location: any) => {
        return '/' + location.pathname.split("/")[1];
    };
    const onUserSelected = (userInfo: AuthorInfo) => {
        setSelectedUser(userInfo.user);
        setSelectedUserStats(userInfo.stats);
    }
    const fetchUserInfo = (searchUserName: string) => {
        if (!selectedUser || (selectedUser && selectedUser.uniqueId !== searchUserName)) {
            fetch(createURL(RouteName.USER_BY_USERNAME, [searchUserName]), { method: 'GET' })
                .then(resp => resp.json())
                .then(res => {
                    setSelectedUser(res.userInfo.user);
                });
        }
    }
    const onEditList = (selectedList: Favorite) => {
        let formData = new FormData();
        formData.append('userId', JSON.stringify(userId));
        formData.append('listName', selectedList.list_name);
        formData.append('listId', selectedList.list_id.toString());
        fetch(createURL(RouteName.ADD_FAVORITES_LIST, []), {
            method: 'POST',
            body: formData
        }).then(resp => resp.json()
            .then(res => {
                getFavorites();
            }));
    }
    const onDeleteList = (list: Favorite) => {
        fetch(createURL(RouteName.DELETE_FAVORITES_LIST, [list.list_id]), {
            method: 'DELETE'
        }).then(resp => resp.json()
            .then(res => {
                getFavorites();
            }));
    };
    const onListNameEdited = (list: any) => {

    }
    const getFavorites = () => {
        fetch(createURL(RouteName.USER_FAVORITES, [userId]), { method: 'GET' })
            .then(resp => resp.json()
                .then(res => {
                    setUserFavoriteLists(res);
                }));
    }
    useEffect(() => {
        getFavorites();
    }, []);
    useEffect(() => {
        if (selectedUser) {
            appHistory.push({
                pathname: `/users/${selectedUser.uniqueId}`,
                state: {
                    update: true,
                }
            });
        }
    }, [selectedUser, selectedUserStats]);
    return (
        <div className="flex flex-1 overflow-auto">
            <Route
                path="/"
                render={({ location }) => (
                    <Fragment>
                        <div className="flex">
                            <Tabs orientation="vertical" variant="scrollable" value={getLocation(location)}>
                                <Tab label="Trending" value="/trending" component={Link} to={allTabs[0]} />
                                <Tab label="Users" value="/users" component={Link} to={allTabs[1]} />
                                <Tab label="Favorites" value="/favorites" component={Link} to={allTabs[2]} />
                            </Tabs>
                        </div>
                        <Divider orientation="vertical"></Divider>
                        <Switch>
                            <Route path={allTabs[0]} render={(props) => <ToksByTrending onUserSelected={onUserSelected}></ToksByTrending>} />
                            <Route path={[`${allTabs[1]}/:userNameParam`, allTabs[1]]} render={(props: any) => <ToksByUser user={selectedUser} stats={selectedUserStats}></ToksByUser>} />
                            <Route path={allTabs[2]} render={(props) => <FavoriteToks favorites={userFavoriteLists} userId={userId} onDeleteList={onDeleteList} onEditList={onEditList}></FavoriteToks>} />
                        </Switch>
                    </Fragment>
                )}
            />
        </div>
    );
}

export default TokTabs;