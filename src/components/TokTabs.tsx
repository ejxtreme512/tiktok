import { Fragment, useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import ToksByTrending from "./ToksByTrending";
import ToksByUser from "./ToksByUser";
import { Divider } from '@material-ui/core';
import { User } from "../types/tok.interface";
import { createURL } from "../utils/url";
import { RouteName } from "../constants/routes";

function TokTabs() {
    const allTabs = ['/trending', '/users', '/favorites'];
    const [selectedUser, setSelectedUser] = useState<User>();
    const getLocation = (location: any) => {
        return '/' + location.pathname.split("/")[1];
    }
    const onUserSelected = (user: User) => {
        setSelectedUser(user);
    }

    const fetchUserInfo = (searchUserName: string) => {
        if (!selectedUser || selectedUser && selectedUser.uniqueId !== searchUserName) {
            fetch(createURL(RouteName.USER_BY_USERNAME, [searchUserName]), { method: 'GET' })
                .then(resp => resp.json())
                .then(res => {
                    setSelectedUser(res.userInfo.user);
                });
        }
    }
    return (
        <BrowserRouter>
            <div className="flex flex-1 overflow-auto">
                <Route
                    path="/"
                    render={({ location }) => (
                        <Fragment>
                            <div className="flex">
                                <Tabs orientation="vertical" variant="scrollable" value={getLocation(location)}>
                                    <Tab label="Trending" value="/trending" component={Link} to={allTabs[0]} />
                                    <Tab label="Users" value="/users" component={Link} to={allTabs[1]} />
                                </Tabs>
                            </div>
                            <Divider orientation="vertical"></Divider>
                            <Switch>
                                <Route path={allTabs[0]} render={(props) => <ToksByTrending onUserSelected={onUserSelected}></ToksByTrending>} />
                                <Route path={[`${allTabs[1]}/:userNameParam`, allTabs[1]]} render={(props: any) => <ToksByUser {...props} onUserSelected={onUserSelected}></ToksByUser>} />
                            </Switch>
                        </Fragment>
                    )}
                />
            </div>
        </BrowserRouter>
    );
}

export default TokTabs;