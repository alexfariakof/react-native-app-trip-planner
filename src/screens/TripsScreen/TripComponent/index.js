import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import styles from './styles'

const TripComponent = props => {
    const dim = Dimensions.get('window')
    return (
        <TouchableOpacity onPress={props.onPress} style={{backgroundColor:'yellow'}}>
            <View style={[styles.imageTrip, { width: dim.width - 32}]}>
            <View><Text>Image</Text></View>
                <Text style={styles.textTilte} >{props.tripName}</Text>
                <Text style={styles.textPrice}>R$ {props.price}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default TripComponent