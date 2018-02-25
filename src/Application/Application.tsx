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
     * Alternative to routeOptions, will render an anchor tag in the side navigation.
     */
    href?: string;
    /**
     * Whether the route is hidden or not.
     */
    hidden?: boolean;
}

export interface IHeaderSectionOption {
    render: () => JSX.Element
}

export interface IMainAppOptions {
    sections: { [id: string]: string[] };
    apps: { [id: string]: IAppOptions };
    header: { [id: string]: IHeaderSectionOption },
    beforeRendering: () => Promise<any>,
}

export class Application {
    private sections: { [id: string]: string[] }
    private apps: { [id: string]: IAppOptions }
    private header: { [id: string]: IHeaderSectionOption }
    public beforeRendering: () => Promise<any>

    constructor(options?: IMainAppOptions) {
        this.sections = options && options.sections ? options.sections : {};
        this.apps = options && options.apps ? options.apps : {};
        this.header = options && options.header ? options.header : {};
        this.beforeRendering = options && options.beforeRendering ? options.beforeRendering : () => Promise.resolve();
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
                header: this.header
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
