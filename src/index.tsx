import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppState} from "./models/AppState";
import {App} from "./components/app/App";
import './util.css'

const state = new AppState();
ReactDOM.render(<App state={state} />, document.getElementById('root'));