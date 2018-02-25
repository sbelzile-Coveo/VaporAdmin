import * as React from "react";
import { Application } from '../Initialization/Initialization';
import { CoveoLogoHeaderSection } from "./CoveoLogoHeaderSection";
import { VaporHeaderSection } from "./VaporHeaderSection";
import { Spacer } from "./Spacer";

export const initDemo = (app: Application) => {
    app.registerHeaderSection("logo", { render: CoveoLogoHeaderSection});
    app.registerHeaderSection("spacer", { render: Spacer});
    app.registerHeaderSection("vapor", { render: VaporHeaderSection});
    app.registerApp("Section1", "App1", { routeOptions: { path: "", exact: true, component: () => <div>App 1</div> }} );
    app.registerApp("Section1", "App2", { routeOptions: { path: "app2", component: () => <div>App 2</div> }} );
    app.registerApp("Section1", "App3", { routeOptions: { path: "app3", component: () => <div>App 3</div> }, hidden: true } );
    app.registerApp("Section2", "App4", { routeOptions: { path: "app4", component: () => <div>App 4</div> }} );
    app.registerApp("Section2", "OutsideLink", { href: "http://coveo.com" } );
}