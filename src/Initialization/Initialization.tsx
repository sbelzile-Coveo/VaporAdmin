import * as React from "react";
import * as ReactDOM from "react-dom";
import { VaporApp } from "./VaporApp";
import { RouteProps } from "react-router";

export interface IAppOptions {
    routeOptions: RouteProps;
}

export class MainApplication {
    private sections: { [id: string]: string[] }
    private apps: { [id: string]: IAppOptions }

    constructor() {
        this.sections = {};
        this.apps = {};
    }

    init(root: HTMLElement) {
        ReactDOM.render(
            React.createElement(VaporApp, {
                sections: this.sections,
                apps: this.apps
            }),
            root
        );
    }

    registerApp(sectionId: string, appId: string, options: IAppOptions) {
        this.addAppToSection(sectionId, appId);
        this.apps[appId] = options;
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

export const Application = new MainApplication();
