import * as React from "react";
import { VaporApp } from '../../src/Application/VaporApp';
import { shallow, ReactWrapper, mount } from "enzyme";
import { NavigationSection } from '../../src/Navigation/NavigationSection';
import { NavigationMenuSectionNavLink } from '../../src/Navigation/NavigationMenuNavLink';
import { Route } from 'react-router';
import { NavigationMenuSectionItem } from "../../src/Navigation/NavigationMenuSectionItem";
import { IMainAppOptions } from "../../src/Application/Application";

describe("VaporApp", () => {
    it('should render without errors', () => {
        expect(() => {
            shallow(<VaporApp sections={{}} apps={{}} header={{}} />);
        }).not.toThrow();
    });

    describe("<VaporApp/>", () => {
        let app: ReactWrapper<IMainAppOptions, any>;
        let component: VaporApp;

        let props = {
            sections: {
                "Section1": [ "app1" ],
                "Section2": []
            },
            apps: {
                "app1": {
                    routeOptions: { path: "app1" }
                },
                "app2": {
                    routeOptions: { path: "app2" },
                    hidden: true,
                },
                "app3": {
                    href: "http://coveo.com"
                }
            },
            standaloneApps: {},
            header: {}
        } as IMainAppOptions;

        beforeEach(() => {
            app = mount(
                <VaporApp {...props} />,
                { attachTo: document.getElementById('App') },
            )
        });

        afterEach(() => {
            app.unmount();
            app.detach();
        });

        it("should render one section per provided section", () => {
            const sections = app.find(NavigationSection);
            expect(sections.length).toBe(1);
        });

        it("should not render empty sections", () => {
            const sections = app.find({ title: "Section2" });
            expect(sections.length).toBe(0);
        });

        it("should not add link for hidden sections", () => {
            const sections: ReactWrapper = app.find({ title: "Section1" });
            expect(sections.length).toBe(1);
            const appLinks = sections.first().find(NavigationMenuSectionNavLink);
            expect(appLinks.length).toBe(1);
        });

        it("should add section item for outside links", () => {
            const sections: ReactWrapper = app.find({ title: "Section1" });
            expect(sections.length).toBe(1);
            const appLinks = sections.first().find("a");
            expect(appLinks.length).toBe(1);
        });
    });
})