import React, {Component} from 'react'
import { View, Text, FlatList,Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { RotationGestureHandler } from 'react-native-gesture-handler'
import isIphoneX from '../../utils/IsIphoneX'
import styles from './styles';
import assets  from './assets'

class TripScreen extends Component{
    static navigationOptions = {
        header: null
    }
    state ={
        trip: [],
        points: []
    }

    componentDidMount() {
        this.loadData()       
     }
 
     loadData = async() => {        
         const id = this.props.navigation.state.params.id 
         const tripsAS = await  AsyncStorage.getItem('trips')
         let trips = []
         if(tripsAS){
             trips = JSON.parse(tripsAS)
         }

         const pointsAS = await  AsyncStorage.getItem('trip-'+ id)
         let points = []
         if(pointsAS){
             points = JSON.parse(pointsAS)
         }

         let trip = {
            tripName: '',
            price: 0
         } 
         trips.forEach(element => {
             if(element.id === id){
                    trip = element
             }
         });

         this.setState({ 
             trip : trip,
             points: points })
 
     }

    renderTripItem = TripItem => {
        return (
            <View style={{
                flex:1,
                flexDirection:'row',
                padding:4
            }}>
                <View style={{ flex:1}}>
                    <Text style={{fontWeight:'bold', fontSize:18}} >{TripItem.item.pointName}</Text>
                    <Text>{TripItem.item.description}</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={{textAlign:'left', color:'#24C6DC', fontWeight:'bold'}} >R$ { TripItem.item.price.toFixed(2) }</Text>
                </View>
            </View>
        )
    }

    render (){
        const id = this.props.navigation.state.params.id
        const { points } = this.state
        return(
            <View style={{justifyContent: 'space-between'}}>                
                <View style={{
                    height:192,
                    backgroundColor:'red'
                 }}>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Image style={{marginTop:32, marginLeft:16}} source={assets.imgBack} />
                 </TouchableOpacity>
                    <Text style={{
                      position:'absolute',
                      left:16,
                      bottom:16

                    }}>
                    { this.state.trip.tripName }</Text>
                    <Text style={{
                        position:'absolute',
                        bottom:16,
                        right:32,
                        textAlign:'right',
                        backgroundColor:'#24C6DC',
                        padding:4,
                        color:'white'
                    }} >R$ { parseFloat(this.state.trip.price).toFixed(2) }</Text>
                
                <TouchableOpacity 
                    style={{
                        position:'absolute',
                        margin:40,
                        right:0
                }} 
                    onPress={() => this.props.navigation.navigate('AddPoint', { id : id, refresh : this.loadData } )}>
                <Image  source={assets.btnAdd} />
              </TouchableOpacity>
              </View>
                <FlatList 
                    contentContainerStyle={{
                        margin:16
                    }}
                    data={points} 
                    renderItem={this.renderTripItem}  
                    pagingEnabled 
                    keyExtractor={TripItem => TripItem.id.toString()}                    
                    style={[ isIphoneX() ? {marginBottom:32} : null ]}
                />
        </View>
        )
    }
}

export default TripScreen