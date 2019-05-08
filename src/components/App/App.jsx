import React from 'react';
import Card from '@material-ui/core/Card';

import Navigation from '../Navigation';
import { StateProvider } from '../../context';
import './AppStyles.less';

function App() {
  const initialState = {
    user: null,
    authenticated: false,
  };
  return (
    <StateProvider initialState={initialState}>
      <div className="App">
        <Card className="Main">
          <Navigation  />
        </Card>
      </div>
    </StateProvider>
  );
}

export default App;
