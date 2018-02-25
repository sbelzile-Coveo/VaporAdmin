import * as React from "react";
import { VaporFrame } from "../Index";
import { SideNavigation } from "react-vapor";
import { NavigationSection } from "../Navigation/NavigationSection";
import { NavigationMenuSectionNavLink } from "../Navigation/NavigationMenuNavLink";
import { NavigationMenuSectionItem } from "../Navigation/NavigationMenuSectionItem";
import { IAppOptions, IHeaderSectionOption } from "./Initialization";
import { Switch, Route, RouteProps } from "react-router";
import { HashRouter } from "react-router-dom";
import { VaporHeader } from "../Views/VaporHeader";

export interface IVaporAppProps {
    sections: { [id: string]: string[] },
    apps: { [id: string]: IAppOptions },
    header: { [id: string]: IHeaderSectionOption }
}

export class VaporApp extends React.Component<IVaporAppProps> {
    render() {
        return (
            <HashRouter>
                <VaporFrame navigation={this.buildNavigation()} header={this.buildHeader()}>
                    <Switch>
                        {this.buildRoutes()}
                    </Switch>
                </VaporFrame>
            </HashRouter>
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
            .map(appId => <Route key={appId} {...this.props.apps[appId].routeOptions} path={`/${this.props.apps[appId].routeOptions.path}`} />);
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