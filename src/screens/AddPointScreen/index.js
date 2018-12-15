import React, {Component} from 'react'
import {View, Text, TextInput ,Image, TouchableOpacity, AsyncStorage} from 'react-native'
import { RotationGestureHandler } from 'react-native-gesture-handler'
import MapView, { Marker } from 'react-native-maps'
import styles from './styles'
import assets from './assets';

// Validar campos antes de salvar 
// Exbir tela com erros e campos na cor vermelha
class AddPointScreen extends Component{
    static navigationOptions = {
        header: null
    }

    state = {
        id: new Date().getTime(),
        position:{
            latitude:37.78825,
            longitude: -122.4324
        },
        pointName: '',
        description: '',
        price: 0                
    }

    handleSave = async() => {
        const id = this.props.navigation.state.params.id

        const pointsAS = await AsyncStorage.getItem('trip-' + id)
        let points = []
        if(pointsAS){
            points = JSON.parse(pointsAS)
        }
        points.push(this.state)      
        await AsyncStorage.setItem('trip-'+id, JSON.stringify(points))

        let total = 0
        points.forEach( p => {
            total += p.price
        })
        

        const tripsAS = await AsyncStorage.getItem('trips')
        let trips = []
        if(tripsAS){
            trips = JSON.parse(tripsAS)
        }
        trips.forEach( (trip, index) => {
            if(trip.id === id){
                trips[index].price = total     
                trips[index].latitude = points[0].position.latitude
                trips[index].longitude = points[0].position.longitude
            }
        })

        await AsyncStorage.setItem('trips', JSON.stringify(trips))
        this.props.navigation.state.params.refresh()
        this.props.navigation.goBack()

    }

    render (){               
        return(
            <View style={styles.body}>                
                <View style={styles.bodyHeader}>
                    <TouchableOpacity onPress={() =>{
                                            this.props.navigation.state.params.refresh()
                                            this.props.navigation.goBack()
                                        }
                                      }>
                        <Image style={styles.imgBack} source={assets.imgBack} />
                    </TouchableOpacity>
                    <MapView style={styles.mapView} initialRegion={{
                        latitude: -22.7967374,
                        longitude: -43.3995799,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }} >
                        <Marker 
                            coordinate={{
                                latitude: -22.7967374,
                                longitude: -43.3995799        
                            }}
                            onDragEnd={
                                (evt) => this.setState({ position: evt.nativeEvent.coordinate })
                            }
                            draggable
                        />
                    </MapView>
                </View>
                <TextInput style={ styles.textInput } placeholder='Nome do Ponto' onChangeText={txt => this.setState({ pointName: txt})} ></TextInput>
                <TextInput style={ styles.textInput } placeholder='Descrição' onChangeText={txt => this.setState({ description: txt})} ></TextInput>
                <TextInput style={ styles.textInput } placeholder='Preço' onChangeText={txt => this.setState({ price: parseFloat(txt)})} ></TextInput>
                <TouchableOpacity style={styles.btnSalvar} onPress={this.handleSave} >
                    <Image source={assets.imgBtnSalvar} />
                </TouchableOpacity>
        </View>
        )
    }
}

export default AddPointScreen