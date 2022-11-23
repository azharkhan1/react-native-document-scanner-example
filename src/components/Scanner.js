import React from 'react';
import {Image, Button, View} from 'react-native';
import useScanner from '../hooks/useScanner';
import styles from './styles';
const Scanner = ({imgStyle, containerStyle}) => {
  const {scanDocument, scannedImage, setScannedImage} = useScanner();

  if (scannedImage) {
    return (
      <View style={[styles.container, containerStyle]}>
        <Image
          resizeMode="contain"
          style={[styles.img, imgStyle]}
          source={{uri: scannedImage}}
        />
        <Button title="go back" onPress={() => setScannedImage(false)} />
      </View>
    );
  }

  if (!scannedImage) {
    return (
      <View style={[styles.container, containerStyle]}>
        <Button title="Scan document" onPress={scanDocument} />
      </View>
    );
  }
};

export default Scanner;
