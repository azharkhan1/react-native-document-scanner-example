/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Button, SafeAreaView} from 'react-native';
import Scanner from './src/components/Scanner';
import BackgroundLocationHelper from './src/helpers/LocationHelper';

const App = () => {
  const startBackgroundTracking = () => BackgroundLocationHelper.startService();

  const stopBackgroundTracking = () => BackgroundLocationHelper.stopService();

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Scanner />

      <Button
        title="start background tracking"
        onPress={startBackgroundTracking}
      />
      <Button
        title="stop background tracking"
        onPress={stopBackgroundTracking}
      />
    </SafeAreaView>
  );
};

export default App;
