import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { template } from 'handlebars';

const information = {
  clubName: ''
};

const onFormSubmit = (e) => {
  e.preventDefault();

  const info = e.target.elements.clubName.value;

  if (info) {
    information.clubName = info;
    e.target.elements.clubName.value = '';
  }

  console.log(information);
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <form onSubmit={onFormSubmit} className="Form">
          <h1>Add Club</h1>
          <input type="text" name="clubName" placeholder="Club Name" className="Form-Input"/>
          <button className="Form-Button Form-Buttom-Picture">Add pictures</button>
          <input type="text" name="tags" placeholder="Tags" className="Form-Input" />
          <textarea rows="4" cols="50" placeholder="About"
          className="Form-Input Form-Input-About"></textarea>
          <div className="Social-Media">
            <span>Social media:</span>
            <div className="Social-Media-Type">
              <p>Fb</p>
              <button className="Form-Button">+</button>
            </div>
            <div className="Social-Media-Type">
              <p>Ins</p>
              <button className="Form-Button">+</button>
            </div>
            <div className="Social-Media-Type">
              <p>Twitter</p>
              <button className="Form-Button">+</button>
            </div>
          </div>
          <input type="text" name="meetingLocation" placeholder="Meeting location" className="Form-Input"/>
          <input type="text" name="meetingTimes" placeholder="Meeting times" className="Form-Input"/>
          <input type="text" name="website" placeholder="website URL" className="Form-Input"/>
          <input type="text" name="events" placeholder="Events" className="Form-Input"/>
          <button>
            submit
          </button>
        </form>
      </div>
    );
  }
}

export default App;
