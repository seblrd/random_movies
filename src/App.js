import './css/App.css';
import React from 'react';
import { HeaderBar } from "./Components/HeaderBar.js"
import { Body } from "./Components/Body.js"
import { Popup } from "./Components/Popup.js"

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.handle_popup_display = this.handle_popup_display.bind(this);
    this.state = {
      style_popup: { display: "none" },
      movie_id: 458576,
    };
  }
  handle_popup_display(style, id) {
    this.setState({ style_popup: { display: `${style}` }, movie_id: id });
  }
  render() {
    return (
      <div>
        <Popup movie_id={this.state.movie_id} style_popup={this.state.style_popup} display_popup={this.handle_popup_display} />
        <div className="HeaderBar">
          <HeaderBar />
        </div>
        <div className="Body">
          <Body display_popup={this.handle_popup_display} />
        </div>
      </div>
    )
  }
}