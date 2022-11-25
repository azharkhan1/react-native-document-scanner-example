import BackgroundGeolocation from 'react-native-background-geolocation';
// import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import DeviceInfo from 'react-native-device-info';
class BackgroundLocationHelper {
  initConfig = () => {
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 5,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true, // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: 'http://192.168.100.12:5000/get-message',
      batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
      // headers: {
      //   // <-- Optional HTTP headers
      //   'X-FOO': 'bar',
      // },
      // params: {
      //   // <-- Optional HTTP params
      //   auth_token: 'maybe_your_server_authenticates_via_token_YES?',
      // },
      postTemplate: {
        coordinates: {lat: '@latitude', long: '@longitude'}, // you can also add your own properties
      },
    })
      .then(state => {
        // setEnabled(state.enabled);
        console.log(
          '- BackgroundGeolocation is configured and ready: ',
          state.enabled,
        );
        BackgroundGeolocation.start();
      })
      .catch(err => {
        console.log('err', err);
        // this.checkPermissionAndRunService();
      });
  };

  checkPermissionAndRunService = () => {
    DeviceInfo.isLocationEnabled().then(enabled => {
      if (enabled) {
        BackgroundGeolocation.start();
      } else {
        // if (utils.isPlatformAndroid()) {
        // LocationServicesDialogBox.checkLocationServicesIsEnabled({
        //   message:
        //     "<h2>Use Location ?</h2>Carhub wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        //   ok: 'YES',
        //   cancel: 'NO',
        //   enableHighAccuracy: false, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        //   showDialog: true, // false => Opens the Location access page directly
        //   openLocationServices: true, // false => Directly catch method is called if location services are turned off
        //   preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
        //   preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
        //   providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
        // })
        //   .then(
        //     function (success) {
        //       LocationServicesDialogBox.forceCloseDialog();
        //       if (!status.isRunning) {
        //         BackgroundGeolocation.start();
        //       }
        //     },
        //   )
        //   .catch(error => {
        //   });
        // }
      }
    });
  };

  startService = () => {
    this.initConfig();
  };

  stopService = () => {
    if (BackgroundGeolocation) {
      BackgroundGeolocation.stop();
      BackgroundGeolocation.removeAllListeners();
    }
    // if (utils.isPlatformAndroid()) {
    //   LocationServicesDialogBox.stopListener();
    // }
  };
}

export default new BackgroundLocationHelper();
