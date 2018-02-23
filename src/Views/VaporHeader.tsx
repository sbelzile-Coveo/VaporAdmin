import * as React from "react";
import { Svg } from "react-vapor";

export class VaporHeader extends React.Component {
    render() {
        return (
            <header className="header bg-polygon">
                {this.props.children}
            </header>
        );
    }
}
