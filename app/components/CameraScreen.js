import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity, StyleSheet
} from 'react-native';
import { RNCamera as Camera } from 'react-native-camera';
import Toast, {DURATION} from 'react-native-easy-toast'
import OpenCV from '../NativeModules/OpenCV';
import { withNavigation } from 'react-navigation';
import CircleWithinCircle from '../assets/CircleWithinCircle';
 class CameraScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
    
  };
  constructor(props) {
    super(props);

    this.takePicture = this.takePicture.bind(this);
    this.checkForBlurryImage = this.checkForBlurryImage.bind(this);
    this.proceedWithCheckingBlurryImage = this.proceedWithCheckingBlurryImage.bind(this);
    this.repeatPhoto = this.repeatPhoto.bind(this);
    this.usePhoto = this.usePhoto.bind(this);
    this.proceedWithLookingForDocument = this.proceedWithLookingForDocument.bind(this);
    this.lookForDocument = this.lookForDocument.bind(this);
  }

  state = {
    cameraPermission: false,
    photoAsBase64: {
      content: '',
      isPhotoPreview: false,
      photoPath: '',
    },
  };

  checkForBlurryImage(imageAsBase64) {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        OpenCV.checkForBlurryImage(imageAsBase64, error => {
          // error handling
        }, msg => {
          resolve(msg);
        });
      } else {
        OpenCV.checkForBlurryImage(imageAsBase64, (error, dataArray) => {
          resolve(dataArray[0]);
        });
      }
    });
  }
  lookForDocument(imageAsBase64) {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        OpenCV.lookForDocument(imageAsBase64, error => {
          // error handling
        }, msg => {
          resolve(msg);
        });
      } else {
        OpenCV.lookForDocument(imageAsBase64, (error, dataArray) => {
          resolve(dataArray[0]);
        });
      }
    });
  }

  proceedWithCheckingBlurryImage() {
    const { content, photoPath } = this.state.photoAsBase64;

    this.checkForBlurryImage(content).then(blurryPhoto => {
      if (blurryPhoto) {
        this.refs.toast.show('Photo is blurred!',DURATION.FOREVER);
        return this.repeatPhoto();
      }
      this.refs.toast.show('Photo is clear!', DURATION.FOREVER);
      this.setState({ photoAsBase64: { ...this.state.photoAsBase64, isPhotoPreview: true, photoPath } });
    }).catch(err => {
      console.log('err', err)
    });
  }
  proceedWithLookingForDocument() {
    const { content, photoPath } = this.state.photoAsBase64;

    this.lookForDocument(content).then( newImage => {
      this.setState({
        ...this.state,
        photoAsBase64: { content: newImage, isPhotoPreview: true, photoPath: newImage.uri },
      });
    }).catch(err => {
      console.log('err', err)
    });
  }

  async takePicture() {
   /* if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({
        ...this.state,
        photoAsBase64: { content: data.base64, isPhotoPreview: false, photoPath: data.uri },
      });
      this.proceedWithLookingForDocument();
    } */ 
  }


  repeatPhoto() {
    this.setState({
      ...this.state,
      photoAsBase64: {
        content: '',
        isPhotoPreview: false,
        photoPath: '',
      },
    });
  }

  usePhoto() {
    // do something, e.g. navigate
  }


  render() {
    if (this.state.photoAsBase64.isPhotoPreview) {
      return (
        <View style={styles.container}>
          <Toast ref="toast" position="center" />
          <Image
            source={{ uri: `data:image/png;base64,${this.state.photoAsBase64.content}` }}
            style={styles.imagePreview}
          />
          <View style={styles.repeatPhotoContainer}>
            <TouchableOpacity onPress={this.repeatPhoto}>
              <Text style={styles.photoPreviewRepeatPhotoText}>
                Repeat photo
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.usePhotoContainer}>
            <TouchableOpacity onPress={this.usePhoto}>
              <Text style={styles.photoPreviewUsePhotoText}>
                Use photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        >
          <View style={styles.takePictureContainer}>
          <TouchableOpacity onPress={this.takePicture}>
              <View>
                <CircleWithinCircle />
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
        <Toast ref="toast" position="center" />
      </View>
    );
  }
}
  
    const styles = StyleSheet.create({
    imagePreview: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 60,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    repeatPhotoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '50%',
      height: 80,
      backgroundColor: '#000',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    topButtonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      padding: 10,
      justifyContent: 'space-between',
    },
    focusFrameContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
    },
    focusFrame: {
      height: 90,
      width: 90,
      borderWidth: 1,
      borderColor: '#fff',
      borderStyle: 'dotted',
      borderRadius: 5,
    },
    photoPreviewRepeatPhotoText: {
      color: '#abcfff',
      fontSize: 15,
      marginLeft: 10,
    },
    usePhotoContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: '50%',
      height: 80,
      backgroundColor: '#000',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    photoPreviewUsePhotoText: {
      color: '#abcfff',
      fontSize: 15,
      marginRight: 10,
    },
    preview: {
      position: 'relative',
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    takePictureContainer: {
      position: 'absolute',
      paddingVertical: 20,
      bottom: 20,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export default withNavigation(CameraScreen);