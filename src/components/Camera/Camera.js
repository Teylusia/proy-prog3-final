import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';

class Camara extends Component {
  constructor(props){
    super(props)
    this.metodosDeCamara = null
    this.state = {
      mostrarCamara: false,
      photo: ''
    }
  }
  componentDidMount(){
    Camera.requestCameraPermissionAsync()
    .then( () =>{ 
      this.setState({
        permission: true
      })
    }).catch(err => console.log(err))
  }
  takePicture(){
    this.metodosDeCamara.takePictureAsync()
    .then(photo => {
      this.setState({
        photo: photo.uri,
        showCamera: false,
      })
    }).catch( err => console.log(err))
  }
  aceptarImagen(){
    fetch(this.state.photo)
    .then(binaryImage => binaryImage.blob())
    .then( img =>{
      const ref = storage.ref(`fotos/${Date.now().jpg}`)
      ref.put(img)
      .then(() => {
        ref.getDownloadURL()
        .then((url) => this.props.imageUpload(url))
        .catch( (err) => console.log(err))
      })
    })
  }

  render() {
    return (
      <View>
        <Camera 
        style={styles.cameraBody}
        type= {Camera.Constants.Type.Back}
        ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
        />
      <TouchableOpacity style={styles.button} onPress={() => this.takePicture()}>
        <Text>Shoot</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cameraBody: {
    width: 500,
    height: 500,

  },
  button: {
    width: 75,
    marginTop: 20, 
    backgroundColor: '#77ACA2',
    borderRadius: 25,
  },
})

export default Camera;
