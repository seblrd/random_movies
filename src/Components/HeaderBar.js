import React from 'react';
export class HeaderBar extends React.Component {
    headerBar() {
        const headerBar = React.createElement("h1", null, "This is the header")
        return headerBar
    }
    render() {
        return (
            this.headerBar()
        )
    }

}
