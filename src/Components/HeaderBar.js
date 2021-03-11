import React from 'react';
import API from "../utils/API"
export class HeaderBar extends React.Component {
    async get_random_movie() {
        const generate_random_id = (min, max) => {
            let id = Math.round(Math.random() * (max - min) + min)
            return (id)
        }
        var max_page = await API.get_max_number_pages_popular_movies()
        var data = await API.get_random_movie(generate_random_id(1, max_page))
        var movie = data[generate_random_id(0, data.length - 1)]
        return movie.id
    }
    async display_popup() {
        let ran_mov = await this.get_random_movie()
        this.props.display_popup("block", ran_mov);
        console.log("ran mov", ran_mov)
    }
    headerBar() {
        const headerBar = (
            <div className="headBar">
                <h1> Random Movies</h1>
                <button type="button" onClick={() => { this.display_popup() }}>&#8766;</button>
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
