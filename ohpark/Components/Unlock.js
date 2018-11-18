import React from 'react' ;
import { StyleSheet, Text, View, Button , Alert, TouchableOpacity} from 'react-native';
import { bookParkingService } from '../services/bookParkingService.js'


class Unlock extends React.Component{
	constructor(props){
		super(props)
	}

alert = () => {
	parkingUnlocked = this.props.navigation.getParam('parkingUnlocked',null)
	Alert.alert(
		'Parking Unlocked',
		'You may now leave the parking spot..',
		[
			{text: 'Cancel' , onPress:() =>console.log('CANCEL')},
			{text:'Ok' , onPress:()=>{
				parkingUnlocked()
				bookParkingService('parking01',0)
				this.props.navigation.navigate("Menu")
				}
			},
		],
		{cancelable:false}
		)
	}
	render(){
		return(
			<View style={styles.container}>
				<TouchableOpacity style={styles.row} onPress={this.alert}>
					<Text style={{fontWeight: 'bold', fontSize: 30, color: 'white', textAlign: 'center'}}>
						Unlock !
					</Text>
				</TouchableOpacity>
			</View>		
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 160,
	  },
	  row: {
		backgroundColor: '#2ecc71',
		justifyContent: 'center',
		borderRadius: 70,
		paddingVertical: 25,
		paddingRight: 70,
		paddingLeft: 70,
	  },
  });

export default Unlock