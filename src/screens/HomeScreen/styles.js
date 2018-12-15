import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
    background:{
        flex : 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    logoTripPlanner:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'    
    },
    logoDevPleno:{
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'center',
        paddingBottom:32      
    },
    buttonBackground:{
        backgroundColor: 'white',                        
        paddingTop:16,
        paddingBottom:16
    },
    buttonText:{ 
        textAlign: 'center',
        fontSize:18,
        color:'black'
    },
    pin: {
        marginTop:16,
        marginBottom:16
    },
    arrow:{
        marginTop:16
    },
    buttonEmptyStateBackground:{
        backgroundColor: 'white',                        
        paddingTop:16,
        paddingBottom:16,
        alignItems:'center'
    },
    buttonEmptyStateText:{ 
        textAlign: 'center',
        fontSize:18,
        color:'black',
        alignItems:'center',
        width:220
    }
})
