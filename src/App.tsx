import {StatusBar} from 'react-native';
import React from 'react';
import StackNavigation from './routes/StackNavigation';
import {appColors} from './utils/appColors';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={appColors.secondry} />
      <StackNavigation />
    </>
  );
};

export default App;
