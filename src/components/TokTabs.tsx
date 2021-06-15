import React, { Fragment } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";
import ToksByTrending from "./ToksByTrending";
import ToksByUser from "./ToksByUser";
import { Divider } from '@material-ui/core';

function TokTabs() {
    const allTabs = ['/trending', '/users'];

    return (
        <BrowserRouter>
            <div className="flex flex-1 overflow-auto">
                <Route
                    path="/"
                    render={({ location }) => (
                        <Fragment>
                            <div className="flex">
                                <Tabs orientation="vertical" variant="scrollable"value={location.pathname}>
                                    <Tab label="Trending" value="/trending" component={Link} to={allTabs[0]} />
                                    <Tab label="Users" value="/users" component={Link} to={allTabs[1]} />
                                </Tabs>
                            </div>
                            <Divider orientation="vertical"></Divider>
                            <Switch>
                                <Route path={allTabs[1]} render={(props: any) => <ToksByUser {...props}></ToksByUser>} />
                                <Route path={allTabs[0]} render={(props) => <ToksByTrending></ToksByTrending>} />
                            </Switch>
                        </Fragment>
                    )}
                />
            </div>
        </BrowserRouter>
    );
}

export default TokTabs;