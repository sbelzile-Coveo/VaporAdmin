import * as React from 'react';
import { SideNavigation, SideNavigationMenuSection, SideNavigationLoadingItem, Loading } from 'react-vapor';
import { VaporFrame } from '../Views/VaporFrame';
import { IVaporAppProps } from './VaporApp';
import { VaporHeader } from '../Views/VaporHeader';

export class LoadingApp extends React.Component<IVaporAppProps, any> {
    render() {
        const sections = Object.keys(this.props.sections)
            .map(key => this.buildSection(key));
        const navigation = (
            <SideNavigation>
                {sections}
            </SideNavigation>
        );

        const header = Object.keys(this.props.header).length > 0 
            ? <VaporHeader />
            : null; 

        return (
            <VaporFrame navigation={navigation} header={header}>
                <div className="loading-prompt">
                    <span className="text-purple-blue h1">Loading</span>
                    <Loading />
                </div>
            </VaporFrame>
        );
    }

    private buildSection(sectionId: string): JSX.Element {
        const items = this.props.sections[sectionId]
            .map(appId => <SideNavigationLoadingItem key={appId} className="mod-width-40" />)
        return (
            <SideNavigationMenuSection key={sectionId}>
                {items}
            </SideNavigationMenuSection>
        );
    }
};
