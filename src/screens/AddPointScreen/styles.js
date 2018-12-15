import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
    body:{
        justifyContent: 'space-between'
    },
    bodyHeader:{
        height:384  
    },
    imgBack:{
        marginTop:40,
        marginLeft:16
    },
    mapView:{ 
        height:192, 
        flex:1
    },
    textInput:{        
        height:60,
        fontSize:24,
        color:'white',        
        marginTop:16, 
        marginBottom:0,
        padding:8, 
        backgroundColor:'grey'
        
    },
    btnSalvar: {  
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'center',
        marginTop:16
    }
})