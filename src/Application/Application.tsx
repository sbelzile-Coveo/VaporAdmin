import * as React from "react";
import * as ReactDOM from "react-dom";
import { VaporApp } from "./VaporApp";
import { RouteProps } from "react-router";

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

export class Application {
    private sections: { [id: string]: string[] }
    private apps: { [id: string]: IAppOptions }
    private header: { [id: string]: IHeaderSectionOption }

    constructor() {
        this.sections = {};
        this.apps = {};
        this.header = {};
    }

    init(root: HTMLElement) {
        ReactDOM.render(
            React.createElement(VaporApp, {
                sections: this.sections,
                apps: this.apps,
                header: this.header
            }),
            root
        );
    }

    registerApp(sectionId: string, appId: string, options: IAppOptions) {
        this.addAppToSection(sectionId, appId);
        this.apps[appId] = options;
    }

    registerHeaderSection(id: string, options: IHeaderSectionOption) {
        this.header[id] = options;
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
