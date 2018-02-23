import * as React from "react";
import { VaporFrame } from "../Index";
import { SideNavigation } from "react-vapor";
import { NavigationSection } from "../Navigation/NavigationSection";
import { NavigationMenuSectionNavLink } from "../Navigation/NavigationMenuNavLink";
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
            .map(appId => <Route key={appId} {...this.props.apps[appId].routeOptions} />);
    }

    private buildNavigation(): JSX.Element {
        const sections = Object.keys(this.props.sections).map(key => this.buildSection(key));
        return (
            <SideNavigation>
                {sections}
            </SideNavigation>
        );
    }

    private buildSection(sectionId: string) {
        const apps = this.props.sections[sectionId].map(appId => this.buildApp(appId));
        return (
            <NavigationSection key={sectionId} title={sectionId}>
                {apps}
            </NavigationSection>
        );
    }

    private buildApp(appId: string) {
        const app = this.props.apps[appId];
        return (
            <NavigationMenuSectionNavLink key={appId} route={app.routeOptions.path} exact={app.routeOptions.exact} title={appId} />
        )
    }
}
