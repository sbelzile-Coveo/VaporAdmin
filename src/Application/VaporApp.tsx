import * as React from "react";
import { VaporFrame } from "../Index";
import { SideNavigation } from "react-vapor";
import { NavigationSection } from "../Navigation/NavigationSection";
import { NavigationMenuSectionNavLink } from "../Navigation/NavigationMenuNavLink";
import { NavigationMenuSectionItem } from "../Navigation/NavigationMenuSectionItem";
import { IAppOptions, IHeaderSectionOption, IMainAppOptions } from './Application';
import { Switch, Route, RouteProps } from "react-router";
import { HashRouter } from "react-router-dom";
import { VaporHeader } from "../Views/VaporHeader";
import { PrivateRoute } from './PrivateRoute';
import { WithNavigationApp } from "./WithNavigationApp";

export class VaporApp extends React.Component<IMainAppOptions> {
    render() {
        return (
            <HashRouter>
                <Switch>
                    {this.buildStandaloneRoutes()}
                    <Route path="" render={() => <WithNavigationApp {...this.props} />} />
                </Switch>
            </HashRouter>
        );
    }

    private buildStandaloneRoutes() {
        return Object.keys(this.props.standaloneApps)
            .filter(appId => !!this.props.standaloneApps[appId].routeOptions)
            .map(appId => this.buildRoute(this.props.standaloneApps, appId));
    }

    private buildRoute(apps: { [id: string]: IAppOptions }, appId: string) {
        return !!apps[appId].isPrivate
            ? <PrivateRoute key={appId} app={apps[appId]} isAuthenticated={this.props.isAuthenticated} />
            : <Route key={appId} {...apps[appId].routeOptions} path={`/${apps[appId].routeOptions.path}`} />;
    }
}
