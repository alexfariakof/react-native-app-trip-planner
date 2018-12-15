import React, {Component} from 'react'
import {View, Text, TextInput ,Image, TouchableOpacity, AsyncStorage} from 'react-native'
import { RotationGestureHandler } from 'react-native-gesture-handler'
import MapView, { Marker } from 'react-native-maps'
import styles from './styles'
import assets from './assets';

class AddTripScreen extends Component{
    static navigationOptions = {
        header: null
    }
    state = {
        tripName: ''   
    }



    handleSave = async() => {
        const trip = {
            id: new Date().getTime(),
            tripName: this.state.tripName,
            price:0,
            latitude:-22.7967374,
            longitude:-43.3995799
        }
        //AsyncStorage.clear() //Controle de teste para apaga todo banco criado 
        
        const tripsAS = await AsyncStorage.getItem('trips')
        let trips = []
        if(tripsAS){ // truthy não (null, undefined, 0)
            trips = JSON.parse(tripsAS)
        }
        trips.push(trip)
        //console.log(trip.id)
        //console.log(trips)
        await AsyncStorage.setItem('trips', JSON.stringify(trips))
        //this.props.navigation.navigate('AddPoint', { id : trip.id})
        this.props.navigation.state.params.refresh()
        this.props.navigation.goBack()

    }

    render (){
        return(
            <View style={styles.body}>                
                <View >
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image style={styles.imgBack} source={assets.imgBack} />
                    </TouchableOpacity>
                </View>
                <TextInput style={ styles.textInput } placeholder='Nome da Viagem' onChangeText={txt => this.setState({ tripName: txt})} ></TextInput>
                <TouchableOpacity style={styles.btnSalvar} onPress={this.handleSave} >
                    <Image source={assets.imgBtnSalvar} />
                </TouchableOpacity>
           </View>
        )
    }
}

export default AddTripScreen