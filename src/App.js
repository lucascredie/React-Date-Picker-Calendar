import React, { Component } from 'react';
import './App.css';
import Calendar from './Components/Calendar/calendar';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowAltCircleRight, faArrowAltCircleLeft);

/*
  TODO:
    . Use classes for styling instead of general tags
    . clean up and refactor code so its better.
    . text shouldnt be "selected" highlighted like text
*/ 

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calendar></Calendar>
      </div>
    );
  }
}

export default App;
