import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions,TouchableOpacity } from 'react-native'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';

export default class Header extends Component {
    render() {
        return (

        <View style={styles.header}>
            <TouchableOpacity onPress={()=>  this.props.navigation.navigate('Details')}
             style={[styles.headerItem, {alignSelf:'flex-start'}]}>
                 <Icon2  name="back" size={25} color="rgba(0,0,0,0.7)"  />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerItem, {marginLeft:150}]}>
                <Icon2  name="shoppingcart" size={25} color="rgba(0,0,0,0.7)"  />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerItem, {marginLeft:30}]}>
                <Icon1  name="align-right" size={25} color="rgba(0,0,0,0.7)"  />
            </TouchableOpacity>
        </View>

        )
    }
}

const w = Dimensions.get("screen").width;

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        marginTop:20,
        width:w-30,   
    },
    headerItem:{
        width:45,
        height:45,
        backgroundColor:'#FFFFFF',
        elevation:9,
        borderRadius:15,
        position:'relative',
        alignItems:'center',
        justifyContent:'center',
        
    },
})
