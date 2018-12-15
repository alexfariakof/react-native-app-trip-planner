import React, {Component} from 'react';
import { NetInfo, Text, View, TextInput} from 'react-native'

/* Teste de Conexão com a rede e consumindo APIRest */

class APIRestScreen extends Component{
    state={
        appState: "",
        listMovies: []
    }
    
    componentDidMount = () => {
        this.updateState();
        NetInfo.addEventListener('change', this.updateState.bind(this))
        this.getMovies()
            .then(movies => {
                this.setState({listMovies:movies})
            })
    }

    updateState = (appState)  => {
        NetInfo.fetch().done((reach) => {
            this.setState({appState: reach})
        })
    }    
    getMovies() {
        return fetch('https://facebook.github.io/react-native/movies.json')
        .then(response => response.json())
        .then(response => response.movies)
    }
    render (){
        return (
            <View style={{padding:32}}>                
                <TextInput placeholder="Escreva um texto qualquer" style={{backgroundColor:'gray', marginBottom:16, padding:2}}  onChangeText={(text)=> this.setState({counter:text.length})} />
                <Text style={{marginBottom:16}} >Length : {this.state.counter}</Text>
                <Text style={{ paddingBottom: 16 }}>State: { this.state.appState } </Text>
                {
                    this.state.listMovies.map((rowData) => {
                    return (<Text>{ rowData.title } - {rowData.releaseYear } </Text>)
                    })
                }
            </View>
        )
    }
}
export default APIRestScreen;