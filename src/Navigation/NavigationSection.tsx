import * as React from "react";

export interface INavigationSectionProps {
    title: string;
}

export class NavigationSection extends React.Component<INavigationSectionProps, any> {

    render() {
        return (
            <li className="block navigation-menu-section">
                <div className="navigation-menu-section-header text-white">
                    <span className="navigation-menu-section-header-icon" />
                    {this.props.title}
                </div>
                <ul className="navigation-menu-section-items">
                    {this.props.children}
                </ul>
            </li>
        );
    }
}
