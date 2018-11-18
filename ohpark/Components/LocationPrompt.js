import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import RentPark from './RentPark.js';

import { createStackNavigator } from 'react-navigation';

class LocationPrompt extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: '',
    }
  }
  // _register = () => {
  //   this.props.navigation.navigate('CompleteRegister');
  // }
  render() {    
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={{paddingLeft: 15, fontSize:30, fontWeight: 'bold'}}>
            Insert Location
          </Text>
        </View>
        <View style={styles.row1}>
          <TextInput 
            style={{paddingLeft: 15, fontSize: 20, fontWeight: 'bold'}}
            placeholder='Search' 
            value={this.state.location} 
            onChangeText={ (x) => this.setState({location:x}) }
          />
        </View>
        <View style={styles.row2}>
          <Text style={{paddingLeft: 15, fontSize:20, fontWeight: 'bold'}}>
            Choose type of parking period: 
          </Text>
        </View>
        {/* <TouchableOpacity style={styles.row3}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>
            Long term
          </Text> */}
        {/* </TouchableOpacity> */}
        <TouchableOpacity style={styles.row3} onPress = {() =>  {
          this.props.navigation.navigate('RentPark')
        }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>
            Short term
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
    marginTop: 70,
    marginLeft: 10,
    marginRight: 90,
    borderRadius: 20,
  },
  row1: {
    flexDirection: 'row',
    backgroundColor: '#bdc3c7',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 40,
    borderRadius: 20,
    paddingVertical: 15,
  },
  row2: {
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
    marginTop: 70,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 60,
    borderRadius: 20,
  },
  row3: {
    justifyContent: 'center',
    backgroundColor: '#2ecc71',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
  },
});

const LocationNavigator = createStackNavigator({
  LocationPrompt: { screen: LocationPrompt },
  RentPark: { screen: RentPark},
})


export default LocationNavigator
