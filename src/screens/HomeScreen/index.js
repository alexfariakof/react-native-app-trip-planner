import React, {Component} from 'react';
import { View, Text, ImageBackground, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import assets from './assets'
import styles from './styles'


class HomeScreen extends Component{
    static navigationOptions = {
        header: null
    }

    state = {
        show: false
    }
    handleCounter = () => {
        this.setState({
            show: !this.state.show
        });
    }
    render (){
        const txtStyle = this.state.counter % 2 === 0 ? { color: 'red' } : null
        return (
            <ImageBackground 
                source={assets.background} 
                imageStyle={{ resizeMode : 'stretch' }}
                style={styles.background} 
            >
            {
                this.state.show ?
                    <TouchableOpacity onPress={this.handleCounter}>
                        <Image style={{marginTop:32, marginLeft:16}} source={require('../../../assets/arrow-left.png')} />
                    </TouchableOpacity>
                : null
            }
                <View style={styles.logoTripPlanner}>
                    <Image source={assets.logoTripPlanner} />
                </View>
                <View style={styles.logoDevPleno}>
                    <Image source={assets.logoDevPleno} />
                </View>
                {
                    !this.state.show ?
                    <TouchableWithoutFeedback onPress = {this.handleCounter} >              
                        <View style={styles.buttonBackground}>
                            <Text style= {styles.buttonText}>COMEÇAR</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    :
                    <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('Trips') } >    
                        <View style={styles.buttonEmptyStateBackground}>
                            <Image source={assets.pinFlat} style={styles.pin} />
                            <Text style= {styles.buttonEmptyStateText}> Vamos Planejar sua primeira viagem.</Text>
                            <Image source={assets.arrowRight} style={styles.arrow} />
                        </View>
                    </TouchableWithoutFeedback>
                }
            </ImageBackground>
        );
    }
}

export default HomeScreen;