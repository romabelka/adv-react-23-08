import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import { Camera, Permissions } from 'expo'
import { inject } from 'mobx-react'

@inject('auth')
class AvatarPictureTaker extends Component {
  camera = null
  state = {
    cameraPermissionGranted: null,
    pictureSaved: false
  }

  render() {
    if (
      this.state.cameraPermissionGranted === null ||
      this.state.pictureSaved
    ) {
      return (
        <Button
          onPress={this.onPressTakeAvatarPicture}
          title="Take avatar picture"
          color="#841584"
          accessibilityLabel="Take avatar picture"
        />
      )
    } else if (!this.state.cameraPermissionGranted) {
      return <Text style={{ fontSize: 20 }}>No Camera permissions</Text>
    } else {
      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Camera
            ref={(ref) => {
              this.camera = ref
            }}
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
          />
          <Button
            title="Take picture"
            onPress={this.takePicture}
            style={{ flexShrink: 1 }}
          />
        </View>
      )
    }
  }

  onPressTakeAvatarPicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      cameraPermissionGranted: status === 'granted',
      pictureSaved: false
    })
  }

  takePicture = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync({ base64: true })
      this.props.auth.uploadAvatar(photo)
      this.setState((state) => ({ ...state, pictureSaved: true }))
    }
  }
}

export default AvatarPictureTaker
