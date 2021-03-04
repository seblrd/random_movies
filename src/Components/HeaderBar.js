import React from 'react';
export class HeaderBar extends React.Component {
    headerBar() {
        const headerBar = (
            <div className="headBar">
                <h1> Random Movies</h1>
                <div className="button_list">
                    <button type="button">Accueil</button>
                    <button type="button">Aléatoire</button>
                </div>
            </div>
        )
        return headerBar
    }
    render() {
        return (
            this.headerBar()
        )
    }

}
