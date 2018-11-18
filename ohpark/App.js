import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { createStackNavigator , createAppContainer} from 'react-navigation';

import Icon from './assets/park1.jpg';
import MenuNavigator from './Components/Menu.js'


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      phone_no: '',
    }
  }
  
  __gotoMenu = () => {
    this.props.navigation.navigate('Menu');
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Image source={Icon}/>
          <Text style={{marginTop: 10, fontSize: 30, fontWeight: 'bold'}}>
            Oh Park !!!
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{paddingLeft: 15, fontSize:20, fontWeight: 'bold'}}>
            Phone No. :
          </Text>
        </View>
        <View style={styles.row1}>
        <TextInput
          style={{paddingLeft: 15, fontSize: 15, fontWeight: 'bold'}}
          placeholder = "eg. +60123456789 "
          placeholderTextColor = '#2ecc71'
          returnKeyType = 'next'
          onChangeText={ (x)=>this.setState({phone_no:x}) }
        />
        </View>
        <TouchableOpacity style={styles.row2} onPress={this.__gotoMenu}>
          <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white', textAlign: 'center'}}>
            GO
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#bdc3c7',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 220,
    borderRadius: 30,
    paddingVertical: 8,
  },
  row1: {
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30,
    paddingVertical: 8,
  },
  row2: {
    backgroundColor: '#0652DD',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: 30,
    marginLeft: 240,
    marginRight: 10,
    paddingVertical: 25,
  },
});
//#2e86de
const AppNavigator = createStackNavigator({
  Login: {screen: Login ,
   navigationOptions : {header:null,}},
  Menu: {screen: MenuNavigator ,
    navigationOptions: {header:null,}},
  // RentPark: {screen: RentPark},
})

export default createAppContainer(AppNavigator);


//  <View style={styles.row}>
//           <Text>Phone No:</Text>
//           <TextInput 
//               placeholder = "phone number"
//               placeholderTextColor = 'rgba(0,122,0,0.5)'
//               returnKeyType = 'next'
//               onChangeText={ (x)=>this.setState({phone_no:x}) }
//           />
//         </View>
//         <View style={styles.container}>
//           <Button title="GO!" onPress={this.__gotoMenu}/>
//         </View>