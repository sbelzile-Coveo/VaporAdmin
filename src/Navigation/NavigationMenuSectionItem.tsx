import * as React from "react";

export interface INavigationMenuSectionItemProps {
    href: string;
    title: string;
    target?: string;
}

export const NavigationMenuSectionItem = (props: INavigationMenuSectionItemProps) => {
    return (
        <li>
            <a className="block navigation-menu-section-item" href={props.href} target={props.target}>
                <span className="navigation-menu-section-item-link">
                    {props.title}
                </span>
            </a>
        </li>
    );
}