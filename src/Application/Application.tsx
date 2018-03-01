import * as React from "react";
import * as ReactDOM from "react-dom";
import { VaporApp } from "./VaporApp";
import { RouteProps } from "react-router";
import { LoadingApp } from './LoadingApp';

export interface IAppOptions {
    /**
     * React-Router route props options.
     */
    routeOptions?: RouteProps;
    /**
     * If true, will render a navlink in the left menu, but no Route component in the main app.
     * The purpose of this option is to redirect to a standalone app from the main navigation menu.
     */
    noRender?: boolean;
    /**
     * Alternative to routeOptions, will render an anchor tag in the side navigation.
     */
    href?: string;
    /**
     * Whether the route is hidden or not.
     */
    hidden?: boolean;
    /**
     * Whether the route is protected by authentication.
     */
    isPrivate?: boolean;
}

export interface IHeaderSectionOption {
    render: () => JSX.Element
}

export interface IMainAppOptions {
    sections?: { [id: string]: string[] };
    apps?: { [id: string]: IAppOptions };
    standaloneApps?: { [id: string]: IAppOptions };
    header?: { [id: string]: IHeaderSectionOption },
    beforeRendering?: () => Promise<any>,
    isAuthenticated?: () => boolean,
}

export class Application {
    private sections: { [id: string]: string[] }
    private apps: { [id: string]: IAppOptions }
    private standaloneApps: { [id: string]: IAppOptions }
    private header: { [id: string]: IHeaderSectionOption }
    public beforeRendering: () => Promise<any>;
    public isAuthenticated: () => boolean;

    constructor(private options?: IMainAppOptions) {
        this.sections = options && options.sections ? options.sections : {};
        this.apps = options && options.apps ? options.apps : {};
        this.standaloneApps = options && options.standaloneApps ? options.standaloneApps : {};
        this.header = options && options.header ? options.header : {};
        this.beforeRendering = options && options.beforeRendering ? options.beforeRendering : () => Promise.resolve();
        this.isAuthenticated = options && options.isAuthenticated ? options.isAuthenticated : () => true;
    }

    init(root: HTMLElement) {
        if (this.beforeRendering) {
            this.renderLoading(root);
            this.beforeRendering()
                .then(() => this.renderApplication(root));
        } else {
            this.renderApplication(root);
        }
    }

    registerApp(sectionId: string, appId: string, options: IAppOptions) {
        this.addAppToSection(sectionId, appId);
        this.apps[appId] = options;
    }

    registerStandaloneApp(appId: string, options: IAppOptions) {
        this.standaloneApps[appId] = options;
    }

    registerHeaderSection(id: string, options: IHeaderSectionOption) {
        this.header[id] = options;
    }

    private renderLoading(root: HTMLElement) {
        ReactDOM.render(
            React.createElement(LoadingApp, {
                sections: this.sections,
                apps: this.apps,
                header: this.header
            }),
            root
        );
    }

    private renderApplication(root: HTMLElement) {
        ReactDOM.render(
            React.createElement(VaporApp, {
                sections: this.sections,
                apps: this.apps,
                standaloneApps: this.standaloneApps,
                header: this.header,
                isAuthenticated: this.isAuthenticated
            }),
            root
        );
    }

    private addAppToSection(sectionId: string, appId) {
        let section = this.sections[sectionId];
        if (!section) {
            this.sections[sectionId] = [appId];
        } else {
            this.sections[sectionId].push(appId);
        }
    }
}
