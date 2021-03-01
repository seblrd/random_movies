import React from 'react';
export class Body extends React.Component {
    body(nbr) {
        const body = (
            <div className="cards">
                <div className="card_title">
                    Titre Film {nbr}
                </div>
                <img className="card_pic" src="https://images-na.ssl-images-amazon.com/images/I/71wbalyU7tL._AC_SL1481_.jpg" alt="Img film"></img>
            </div>
        )
        return body
    }
    render() {
        var test = []
        for (let i = 0; i < 10; i++) {
            test.push(
                <div>
                    {this.body(i)}
                </div>
            )
        };
        return (
            <div className="cards_containers">
                {test}
            </div>
        )
    }

}
