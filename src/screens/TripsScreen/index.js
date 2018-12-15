import React, {Component} from 'react'
import { View, Text,  FlatList, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import TripComponent from './TripComponent/'
import styles from './styles'
import assets from './assets'
import MapView from 'react-native-maps'

class TripsScreen extends Component{
    static navigationOptions = {
        header: null
    }
    state = {
        trips : []
    }
    
    renderItemTrip = trip => {
        return <TripComponent 
                    onPress={() => this.props.navigation.navigate('Trip', { id: trip.item.id, refresh: this.loadData }) } 
                    id= {trip.item.id} 
                    tripName={trip.item.tripName} 
                    price={trip.item.price} 
                />
    }

    handleItemChange =  info => {
        //console.log(info)
        const { viewableItems } = info
        if(viewableItems && viewableItems.length > 0 ){
            const [trip] = viewableItems
            this.map.animateToRegion(
                this.regionFrom(trip.item.latitude, trip.item.longitude, 1000),
                2000
            ) 
        }
    }

    regionFrom = (lat, lon, distance) => {
        distance = distance/2
        const circumference = 40075
        const oneDegreeOfLatitudeInMeters = 111.32 * 1000
        const angularDistance = distance/circumference

        const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
        const longitudeDelta = Math.abs(Math.atan2(
                Math.sin(angularDistance)*Math.cos(lat),
                Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

        return result = {
            latitude: lat,
            longitude: lon,
            latitudeDelta,
            longitudeDelta,
        }
    }

    componentDidMount() {
       this.loadData()       
    }

    loadData = async() => {
        const tripsAS = await  AsyncStorage.getItem('trips')
        let trips = []
        if(tripsAS){
            trips = JSON.parse(tripsAS)
        }
        console.log(trips)
        this.setState({ trips: trips })
    }

    render (){
        const listTrips = this.state.trips
        /*
         [
            { id:'1', tripName:'EuroTrip 2019', price:'R$ 10000'},
            { id:'2', tripName:'AmericaTrip 2018', price:'R$ 80000'},
            { id:'3', tripName:'AsiaTrip 2020', price:'R$ 5000'},
            { id:'4', tripName:'AfricaTrip 2015', price:'R$ 3000'}
        ]*/
    
        return (
            <View style={styles.trip}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Image style={{marginTop:32, marginLeft:16}} source={assets.btnBack} />
                </TouchableOpacity>
                <MapView style={{ flex: 1 }}
                    initialRegion={{
                      latitude: 59.370571,
                      longitude: 16.513590,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    ref = { ref => this.map = ref }
                />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddTrip', { refresh: this.loadData })}>
                    <Image style={{
                        position:'absolute',
                        bottom:0,
                        right:20,
                        padding:10
                    }} source={assets.btnAdd} />
                </TouchableOpacity>
                <View>
                    <FlatList 
                        data={listTrips} 
                        renderItem={this.renderItemTrip}  
                        horizontal 
                        pagingEnabled 
                        keyExtractor={item => item.id.toString()}
                        onViewableItemsChanged={ this.handleItemChange }
                    />
                </View>
            </View>
        )
    }
}

export default TripsScreen