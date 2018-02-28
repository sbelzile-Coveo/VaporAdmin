import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { IAppOptions } from './Application';

export interface IPrivateRouteProps {
    app: IAppOptions;
    isAuthenticated: () => boolean;
}

export const PrivateRoute = (props: IPrivateRouteProps) => {
    return (
        <Route path={`/${props.app.routeOptions.path}`} exact={props.app.routeOptions.exact} render={renderProps => {
            if (props.isAuthenticated()) {
                return <props.app.routeOptions.component {...renderProps} />
            }
            return <Redirect to="/login" />
        }} />
    );
}