import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { database, auth } from '../../firebase';
import './AppStyles.less';
import Navigation from '../Navigation';
import { StateProvider } from '../../context';

function App() {
  const [loading, setLoading] = useState('false');
  const initialState = {
    user: null,
    authenticated: false,
  };
  return (
    <StateProvider initialState={initialState}>
      <div className="App">
        <Card className="Main">
          <Navigation />
        </Card>
      </div>
    </StateProvider>
  );
}

export default App;
