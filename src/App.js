import './css/App.css';
import React from 'react';
import { HeaderBar } from "./Components/HeaderBar.js"
import { Body } from "./Components/Body.js"
function App() {
  return (
    <div>
      <div className="HeaderBar">
        <HeaderBar />
      </div>
      <div className="Body">
        <Body />

      </div>
    </div>
  )
}
export default App;
