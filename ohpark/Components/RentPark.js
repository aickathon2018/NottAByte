import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Picker, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { Constants } from 'expo';
import { Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

let startTime = '';
let endTime = '';


class RentPark extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isInitialTimePickerVisible: false,
            isEndTimePickerVisible: false,
            startingTime: '',
            endingTime: '',
            opacity: 0,
        }
    }

    // initial time
    _showInitialTimePicker = () => this.setState({ isInitialTimePickerVisible: true });
    _hideInitialTimePicker = () => this.setState({ isInitialTimePickerVisible: false });

    // end date time
    _showEndTimePicker = () => this.setState({ isEndTimePickerVisible: true });
    _hideEndTimePicker = () => this.setState({ isEndTimePickerVisible: false });

    _handleInitialTimePicked = (time) => {
        let currentTime = new Date().getTime().valueOf();
        let inputTime = time.getTime().valueOf();

        if (currentTime  > inputTime )  {
            Alert.alert(
                'Invalid Input',
                '',
                [
                    { text: 'Cancel', onPress: () => console.log('CANCEL') },
                    { text: 'Ok', onPress: () => console.log('OK') },
                ]
            )
        
            this.setState({
                isInitialTimePickerVisible: false,               
            });
            
        } else {
            startTime = time;
            console.log(startTime);
            this.setState({
                isInitialTimePickerVisible: false,
            });
        }
    }

    _handleEndTimePicked = (time) => {
        let currentTime = new Date().getTime().valueOf();
        let inputTime = time.getTime().valueOf();

        if (currentTime > inputTime && startTime.getTime() > inputTime) {
            Alert.alert(
                'Invalid Input',
                '',
                [
                    { text: 'Cancel', onPress: () => console.log('CANCEL') },
                    { text: 'Ok', onPress: () => console.log('OK') },
                ]
            )

            this.setState({
                isEndTimePickerVisible: false,
            });            

        } else {            
            endTime = time;
            console.log(endTime); 
            this.setState({
                isEndTimePickerVisible: false,
            });
        }        
    }

    _saveState = () => {
        this.setState({
            startingTime: startTime,
            endingTime: endTime,
        })
        console.log(this.state.startingTime);
        console.log(this.state.endingTime);
    }


    render() {
        return (
            <View style={styles.container} >
                    <Image
                    style={{ width: SCREEN_WIDTH, height: 200, marginBottom:20 }}
                    source ={require('../assets/carplan.jpg')}/>

                <View style={styles.row}>          
                    <TouchableHighlight 
                        style = {styles.outlineButton} 
                        onPress= {this._showInitialTimePicker}
                        underlayColor= "#2e86de"
                        activeOpacity= {this.state.opacity} >
                        <Text styles = {styles.submitText}>Start Time </Text>
                    </TouchableHighlight>
   
                    <DateTimePicker
                        mode='time'
                        isVisible={this.state.isInitialTimePickerVisible}
                        onConfirm={this._handleInitialTimePicked}
                        onCancel={this._hideInitialTimePicker}
                    />

                    </View>

                    <View style = {styles.row}>
                        <TouchableHighlight
                            style={styles.outlineButton}
                            onPress={this._showEndTimePicker}
                            underlayColor="#2e86de"
                            activeOpacity={this.state.opacity} >
                            <Text styles={styles.submitText}>End Time </Text>
                        </TouchableHighlight>
                        <DateTimePicker
                            mode='time'
                            isVisible={this.state.isEndTimePickerVisible}
                            onConfirm={this._handleEndTimePicked}
                            onCancel={this._hideEndTimePicker}
                        />
                        </View>

                    <View style = {styles.row}>
                        <Button title="BOOK" 
                        onPress={
                            () => {
                                this._saveState
                                this.props.navigation.navigate('Menu')
                                }
                            } 
                        buttonStyle = {{
                            backgroundColor: "#2e86de",
                            borderRadius: 70,
                            height: 50, 
                            width: 300,}}/> 
                </View>  
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // sets top padding to follow status bar 
        // paddingTop: Constants.statusBarHeight,
        marginBottom: 0,

    },

    row: {
        marginBottom: 15,
        marginTop: 15,        
        paddingRight: 70,
        paddingLeft: 70,
        alignItems: "center",
    },

    outlineButton: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2e86de'
    },

    submitText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default RentPark

