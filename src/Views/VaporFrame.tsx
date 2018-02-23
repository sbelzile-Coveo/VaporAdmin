import * as React from "react";
import { VaporHeader } from "./VaporHeader";

export interface ICoveoFrameProps {
    navigation?: JSX.Element;
    header?: JSX.Element;
}

export class VaporFrame extends React.Component<ICoveoFrameProps, any> {
    render() {
        return (
            <div className="coveo-styleguide full-content-y">
                {this.props.header}
                <div className="flex flex-row application-wrapper full-content-y">
                    {this.props.navigation}
                    <div className="page-content application-container">
                        <div className="wrapper">
                            <div className="body">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}