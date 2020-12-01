import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, FlatList, Image,TouchableOpacity  } from 'react-native'
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import firebaseConfig from '../config';

export default class Cart extends Component {

    state={
        // userFlag: false,
        user:"",
        status: "",
        flag: false
    }
    componentDidMount() {
        this.connection();
        this.checkUser();
    
      }

      connection(){
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log("DataBase Running..")
        }
      }
    checkUser(){
        
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
              
          this.setState({
              userFlag: true,
             user: user.email,
          })
        //   console.log('userCart:',this.state.user)

          } else {
           console.log('No User')
          }
        });
      }

      placeOrder(){
        const today = new Date(Date.now());
        const oRef = firebase.database().ref('Orders');
        const order = {
            cart : this.props.route.params.CartTrolley,
            customer: this.state.user,
            time:  today.toDateString(),
          
        };
    
        oRef.push(order);
    
      }

      splice(arr, val) {
        console.log("Removing ",val)
        for (var i = arr.length; i--;) {
          if (arr[i].id === val) {
            arr.splice(i, 1);
          }
        }
        console.log('After pop===>> ', arr)
        const newFlag = !this.state.flag
        this.setState({ flag:newFlag})
    }

      handleDelete(CartTrolley, id){
        //   var {CartTrolley } = this.props.route.params;
          console.log("Removing ",id)
        //   CartTrolley.pop();
         CartTrolley.filter((item)=>(
            item.id !== id
        ))
        // CartTrolley.filter(function(item) {
        //     return item.id !== id
        // })
          console.log('After pop===>> ', CartTrolley)

      }
    renderCart = ({item}) => {
        const {CartTrolley } = this.props.route.params;
        return(
                <Animatable.View animation='slideInDown' duration={2000}
                  style={styles.CartItemContainer}>
                    <View style={{marginLeft:20}}>
                        <Text style={{fontSize:20, color:"rgb(228, 150, 6)", fontWeight:'bold',fontSize:18, width:100}}>{item.title}</Text>
                        <Text  style={{fontSize:16,fontSize:20,color:"black",fontWeight:'bold'}} >{item.price} pkr </Text>
                        <TouchableOpacity onPress={()=>this.splice(CartTrolley, item.id)}
                         style={{alignSelf: 'center', padding:20 ,alignItems: 'center', borderRadius:40,backgroundColor:"rgba(228, 150, 6,0.3)"}}  >
                                <Icon2  name="delete" size={25} color="rgba(0,0,0,0.7)"  />
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ }}> */}
                        <Animatable.Image animation="pulse" easing="ease-out" iterationCount="infinite"
                         source={{uri: item.img}} style={{width:140, height:140}} />

                    {/* </View>     */}
                </Animatable.View> 
        )
    }

    render() {
        // const {CartBasket } = this.state;
        const {CartTrolley } = this.props.route.params;
        return (
            <View style={styles.conatiner} >
                {/* <Text style={{fontSize: 30, alignSelf: 'center',fontWeight:'bold'}} > CART </Text> */}
                {console.log("Cart==========>>>",CartTrolley)}
                <FlatList
                    data={CartTrolley}
                    renderItem={this.renderCart}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />

                <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite"   >
                <Button 
                    onPress={()=>this.props.navigation.navigate("CheckPage",{CartTrolley}) } title="CheckOut" titleStyle={{color:"rgb(68,44,46)",fontWeight:'bold',}} buttonStyle={styles.buttonContainer}
                    icon={
                        <Icon2
                        name="shoppingcart"
                        size={25}
                        color="rgb(68,44,46)"
                        style={{paddingRight:20}}
                        />
                    }
                    />
    {/* {
        (this.state.userFlag) ? (
            <Button 
            onPress={()=>this.placeOrder() } title="Buy" titleStyle={{color:"rgb(68,44,46)",fontWeight:'bold',}} buttonStyle={styles.buttonContainer}
            icon={
                <Icon2
                name="shoppingcart"
                size={25}
                color="rgb(68,44,46)"
                style={{paddingRight:20}}
                />
            }
            />
        ) : (<Button 
        onPress={()=>this.props.navigation.navigate("Login") } title="Login to Buy " titleStyle={{color:"rgb(68,44,46)",fontWeight:'bold',}} buttonStyle={styles.buttonContainer}
        icon={
            <Icon2
            name="shoppingcart"
            size={25}
            color="rgb(68,44,46)"
            style={{paddingRight:20}}
            />
        }
        />)
    } */}


                        </Animatable.View>
            </View>
        )
    }
}
const w = Dimensions.get("screen").width;
const styles = StyleSheet.create({
    conatiner:{
        flex:1,
        // padding:20,
        marginTop:10,
    // backgroundColor: '#F8F8F8',
        alignItems:'center',
    },
    CartItemContainer:{
        width: w-50,
        height: 200,
        backgroundColor:'#FFFFFF',
    //   backgroundColor:'rgb(211,205,180)',
       borderColor:'black',
    //   rgb(222,63,86)
      // borderColor:"rgb(222,63,86)",
    //    borderWidth:3,
        elevation:6,
        borderRadius:40,
        padding:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom:10,

        borderLeftWidth:8,
        borderRightWidth:8,
       // borderRadius:15,
       borderColor:'rgb(211,205,180)',
      // borderColor: '#eb3838',
        borderWidth:2,

    },
    buttonContainer:{
        marginTop:10,
        marginBottom:20,
        borderBottomLeftRadius:50,
        borderTopRightRadius:50,
        // backgroundColor:'rgb(15,186,183)',
        backgroundColor:'rgb(211,205,180)',
        elevation:5,
        width:234,
        height:54,
        alignSelf:'center',
        color:"rgb(68,44,46)",
        fontWeight:'bold',
      }
})
