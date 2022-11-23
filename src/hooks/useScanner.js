import {useState} from 'react';
import DocumentScanner from 'react-native-document-scanner-plugin';

export default (options = {}) => {
  const [scannedImage, setScannedImage] = useState();

  const scanDocument = async () => {
    try {
      // start the document scanner
      const {scannedImages} = await DocumentScanner.scanDocument(options);

      // get back an array with scanned image file paths
      if (scannedImages.length > 0) {
        // set the img src, so we can view the first scanned image
        setScannedImage(scannedImages[0]);
      }
    } catch (err) {
      setScannedImage(false);
      alert('some error occured');
    }
  };

  return {
    scanDocument,
    scannedImage,
    setScannedImage,
  };
};
