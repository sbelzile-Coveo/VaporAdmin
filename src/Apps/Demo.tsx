import * as React from "react";
import { Application } from "../Initialization/Initialization";
import { CoveoLogoHeaderSection } from "./CoveoLogoHeaderSection";
import { VaporHeaderSection } from "./VaporHeaderSection";
import { Spacer } from "./Spacer";

export const initDemo = () => {
    Application.registerHeaderSection("logo", { render: CoveoLogoHeaderSection});
    Application.registerHeaderSection("spacer", { render: Spacer});
    Application.registerHeaderSection("vapor", { render: VaporHeaderSection});
    Application.registerApp("Section1", "App1", { routeOptions: { path: "", exact: true, component: () => <div>App 1</div> }} );
    Application.registerApp("Section1", "App2", { routeOptions: { path: "app2", component: () => <div>App 2</div> }} );
    Application.registerApp("Section1", "App3", { routeOptions: { path: "app3", component: () => <div>App 3</div> }} );
    Application.registerApp("Section1", "App4", { routeOptions: { path: "app4", component: () => <div>App 4</div> }} );
}