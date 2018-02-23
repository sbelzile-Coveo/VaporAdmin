import * as React from "react";
import { Application } from "../Initialization/Initialization";

export const initDemo = () => {
    Application.registerApp("Section1", "App1", { routeOptions: { path: "/", component: () => <div/> }} )
}