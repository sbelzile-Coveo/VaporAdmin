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

export class WithNavigationApp extends React.Component<IMainAppOptions> {
    render() {
        return (
            <VaporFrame navigation={this.buildNavigation()} header={this.buildHeader()}>
                {this.buildRoutes()}
            </VaporFrame>
        );
    }

    private buildHeader() {
        const headerKeys = Object.keys(this.props.header);
        const sections = headerKeys.map(id => this.props.header[id].render());
        return headerKeys.length > 0
            ? (
                <VaporHeader>
                    {sections}
                </VaporHeader>
            )
            : null;
    }

    private buildRoutes(): JSX.Element[] {
        return Object.keys(this.props.apps)
            .filter(appId => !!this.props.apps[appId].routeOptions)
            .filter(appId => !this.props.apps[appId].noRender)
            .map(appId => {
                return this.buildRoute(this.props.apps, appId)
            });
    }

    private buildRoute(apps: { [id: string]: IAppOptions }, appId: string) {
        return !!apps[appId].isPrivate
            ? <PrivateRoute key={appId} app={apps[appId]} isAuthenticated={this.props.isAuthenticated} />
            : <Route key={appId} {...apps[appId].routeOptions} path={`/${apps[appId].routeOptions.path}`} />;
    }

    private buildNavigation(): JSX.Element {
        const sections = Object.keys(this.props.sections)
            .filter(key => this.props.sections[key].length > 0)
            .map(key => this.buildSection(key));
        return (
            <SideNavigation>
                {sections}
            </SideNavigation>
        );
    }

    private buildSection(sectionId: string) {
        const apps = this.props
            .sections[sectionId]
            .filter(appId => !this.props.apps[appId].hidden)
            .map(appId => this.buildApp(appId));
        return (
            <NavigationSection key={sectionId} title={sectionId}>
                {apps}
            </NavigationSection>
        );
    }

    private buildApp(appId: string) {
        const app = this.props.apps[appId];
        return !!app.routeOptions
            ? <NavigationMenuSectionNavLink key={appId} route={app.routeOptions.path} exact={app.routeOptions.exact} title={appId} />
            : <NavigationMenuSectionItem key={appId} target="_blank" href={app.href} title={appId} />;
    }
}
