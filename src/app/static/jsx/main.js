import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Navbar from './navbar';

function App() {
  return <Button variant="contained">Hello World</Button>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
ReactDOM.render(<Navbar />, document.querySelector('#navbar'));
