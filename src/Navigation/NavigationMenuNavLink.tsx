import * as React from "react";
import { NavLink } from "react-router-dom";

export interface INavigationMenuSectionNavLinkProps {
    route: string;
    title: string;
    exact?: boolean;
}

export class NavigationMenuSectionNavLink extends React.Component<INavigationMenuSectionNavLinkProps, any> {
    render() {
        return (
            <li>
                <NavLink to={`/${this.props.route}`} exact={this.props.exact} className="block navigation-menu-section-item" activeClassName="state-active">
                    <span className="navigation-menu-section-item-link">
                        {this.props.title}
                    </span>
                </NavLink>
            </li>
        );
    }
}