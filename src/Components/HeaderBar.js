import React from 'react';
export class HeaderBar extends React.Component {
    get_random_movie() {
        console.log("clicked")
    }
    headerBar() {
        const headerBar = (
            <div className="headBar">
                <h1> Random Movies</h1>
                <button type="button" onClick={() => { this.get_random_movie() }}>&#8766;</button>
            </div >
        )
        return headerBar
    }
    render() {
        return (
            this.headerBar()
        )
    }

}
