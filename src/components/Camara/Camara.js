import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { storage } from '../../firebase/config';



class Camara extends Component {
  constructor(props){
    super(props)
    this.cameraMethods = null
    this.state = {
      showCamera: false,
      photoUrl: ''
    }
  }
  componentDidMount(){
    Camera.requestCameraPermissionsAsync()
    .then( () => {
      this.setState({
        showCamera: true
      })
    })
    .catch( error => console.log(error))
  }

  takePicture(){
    this.cameraMethods.takePictureAsync()
    .then( photo => this.setState({
      photoUrl: photo.uri,
      showCamera: false
    }))
    .catch( error => console.log(error))
  }
  acceptImage(){
    fetch(this.state.photoUrl)
    .then(binaryImage => binaryImage.blob())
    .then(image => {
      const ref = storage.ref(`photos/${Date.now()}.jpg`)
      ref.put(image)
      .then( () =>{
        ref.getDownloadURL()
        .then((url) => this.props.imageUpload(url))
        .catch(error => console.log(error))
      })
    })
  }
  declineImage(){
    this.setState({
      photoUrl: '',
      showCamera: true
    })
  }

  render() {
    return (
      <View styles={styles.container}>
        {
          this.state.showCamera ?
          <>
            <Camera
            style={styles.cameraBody}
            type={Camera.Constants.Type.back}
            ref={methods => this.cameraMethods = methods} 
            />
            <TouchableOpacity onPress={ () => this.takePicture()}>
              <Text style={styles.goToRegister}>Take Picture!</Text>
            </TouchableOpacity>
          </>
          : this.state.showCamera === false &&  this.state.photoUrl != '' ?
          <>
            <Image
            style={styles.image} 
            source={{uri: this.state.photoUrl }}
            />
            <TouchableOpacity onPress={() => this.acceptImage()}>
            <Text style={styles.goToRegister}>Accept Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.declineImage()}>
            <Text style={styles.goToRegister}>Decline Image</Text>
            </TouchableOpacity>
          </>
          :
          <Text>I need camera access ._.</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  cameraBody: {
    height: 500,
    width: 500,
    marginVertical: 35,
  },
  image: {
    height: 200,
    width: 500,
    borderRadius: 25,
    marginVertical: 35,
    alignSelf: 'center'
  },
  goToRegister: {
    color:  '#d7e3fc',
    backgroundColor: '#809bce',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 50,
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 150,
    alignSelf: 'center'
    
  }
})

export default Camara;
