import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

const Root = () => <Router><App /></Router>;

export default hot(Root);
