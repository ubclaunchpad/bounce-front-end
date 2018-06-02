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
          <h1>Add Your Club</h1>
          <input type="text" name="clubName" placeholder="Club Name" className="Form-Input"/>
          <br/>
          <button className="Form-Button">Add pictures</button>
          <input type="text" name="tags" placeholder="Tags" className="Form-Input" />
          <br/>
          <textarea rows="4" cols="50" placeholder="About"
          className="Form-Input Form-Input-About"></textarea>
          <br/>
          <br/>
          <div className="Social-Media">
            <span>Social media:</span>
            <div className="Social-Media-Type">
              <p>Fb</p>
              <button>+</button>
            </div>
            <div className="Social-Media-Type">
              <p>Ins</p>
              <button>+</button>
            </div>
            <div className="Social-Media-Type">
              <p>Twitter</p>
              <button>+</button>
            </div>
          </div>
          <br/>
          <input type="text" name="meetingLocation" placeholder="Meeting location" className="Form-Input"/>
          <br/>
          <input type="text" name="meetingTimes" placeholder="Meeting times" className="Form-Input"/>
          <br/>
          <input type="text" name="website" placeholder="website URL" className="Form-Input"/>
          <br/>
          <input type="text" name="events" placeholder="Events" className="Form-Input"/>
          <br/>
          <button>submit</button>
        </form>
      </div>
    );
  }
}

export default App;

// const app={
//   title: 'Indecision App',
//   subtitle: 'This is some info'
// };

// var template = (
//   <div>
//       <h1>{app.title}</h1>
//       <p>{app.subtitle}</p>
//       <ol>
//           <li>Item one</li>
//           <li>Item two</li>
//       </ol>
//   </div>
// );


// const appRoot = document.getElementById('root');
// ReactDOM.render(template, appRoot);
