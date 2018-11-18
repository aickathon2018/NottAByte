import React from 'react';
import { StyleSheet, Text, View, Button, Alert,TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {ImagePicker , Permissions} from 'expo';

import Unlock from './Unlock.js'
import {registerCarPlateService} from '../services/registerCarPlateService.js'
import {bookParkingService} from '../services/bookParkingService.js'
import RentPark from './RentPark.js';
// import LocationPrompt from './LocationPrompt.js'
import LocationNavigator from './LocationPrompt.js'

const url = "https://lpr.recoqnitics.com/detect"
const access_key = "8044c46d33a99d066ace"
const secret_key = "4705011ce68297849185e18c15ab2413d1019ebc"


class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBooked : true,
    }
  }

  static navigationOptions = {
    title: 'Welcome'
  };
  
  __gotoUnlock = () => {
    this.props.navigation.navigate('Unlock' , {parkingUnlocked:this.parkingUnlocked})
  }

  __gotoRegister = () => {
    this.uploadCarPlatePicture();
  }

  parkingUnlocked = () => {
    this.setState({
      isBooked:false,
    })
  }

  uploadCarPlatePicture = async() => {
    var formData = new FormData();

    //manually get permissions
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
     } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if(cameraPerm === 'granted' && cameraRollPerm === 'granted'){
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      })

      console.log(result)

      //if selected a photo , do the appropriate API request
      if(!result.cancelled){
      var image = {
        uri: result.uri,
        type: 'image/jpg',
        name: 'image.jpg',
      }

      formData.append("filename",image)
      formData.append("access_key",access_key)
      formData.append("secret_key",secret_key)

      fetch(url, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(json => {
          console.log(json)
          if(json.licensePlates.length!=0)
          {
           registerCarPlateService(json.licensePlates[0].licensePlateNumber)
           Alert.alert(
            'Success',
            'You have successfully registered your car plate!',
            [
              {text: 'Ok'}
            ],
          ) 
          }
          else
          {
            Alert.alert(
              'Failure',
              'You have failed registering your car plate!',
              [
                {text:'Ok'}
              ],
            )         
          }
        })
      }

    }     
  }
 
  render() {
    const showUnlock = 
      <TouchableOpacity style={styles.row} onPress = {this.__gotoUnlock}>
        <Text style={styles.text}>
          Unlock Car Park 
        </Text>
      </TouchableOpacity> ;   
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {/* <Button title = "Book a car park" onPress = {() => {
          
          this.props.navigation.navigate('RentPark')
        }}/>       */}

        <TouchableOpacity style={styles.row} onPress = {() => {
          navigate('LocationPrompt');
          bookParkingService('parking01',1);
          }
          }>
          <Text style={styles.text}>
            Book a Car Park  
          </Text>
        </TouchableOpacity>

        <View>
          {this.state.isBooked ? showUnlock: null}
        </View>
        <TouchableOpacity style={styles.row} onPress={this.__gotoRegister}>
          <Text style={styles.text}>
            Register Car Plate
          </Text>
        </TouchableOpacity>      
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
  },
  row: {
    backgroundColor: '#2e86de',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 22,
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 25,
    paddingRight: 70,
    paddingLeft: 70,
  },

  text: {
    fontWeight: 'bold', 
    fontSize: 20, 
    color: 'white', 
    textAlign: 'center',
  },
});

const MenuNavigator = createStackNavigator({
  Menu: {screen: Menu},
  Unlock: {screen: Unlock},
  LocationPrompt: {screen: LocationNavigator,
    navigationOptions: { header: null, }},
})

export default MenuNavigator

