import React, { Component } from 'react'
import { Text, StyleSheet, View,Alert ,ScrollView, KeyboardAvoidingView,} from 'react-native'
import { Input ,Button,Overlay} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import * as firebase from 'firebase';
import firebaseConfig from '../config';

export default class CheckPage extends Component {

    state={
        email:"",
        username:"",
        address1:"",
        address2:"",
        postalCode:"",
        city:"",
        userData:[]
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
            //   console.log(user)
          this.setState({
              email: user.email,
              username: user.displayName
          })
          } else {
           console.log('No User')
          }
        });
      }
      
      placeOrder(){
        const today = new Date(Date.now());
        const order = {
            cart : this.props.route.params.CartTrolley,
            customer: this.state.userData,
            time:  today.toDateString(),
            email: this.state.email
        };
    
        const db = firebase.firestore();
        db.collection("Orders").add(order)
        .then(function(docRef) {
            Alert.alert("You have Successfuly Place Order")
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        
    
      }

      handleCheck(){
        const {email,username, address1,address2, postalCode,city,userData} = this.state;
        const {CartTrolley } = this.props.route.params;
        const use = {
            username: username,
            email: email,
            address1: address1,
            address2: address2,
            postalCode: postalCode,
            city: city,
          }
        //   userInfo.push(use)
          userData.push(use)
        //   this.setState({userData: userInfo})
        //   console.log( this.state.userData)
         // console.log("Cart Check: ",CartTrolley)
         this.placeOrder();
      }


    render() {
        const {email,username, address1,address2, postalCode,city} = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView enabled={true}   style={styles.form}>
               <ScrollView>
                <View  >
                    <Input
                        placeholder='Email'
                        // containerStyle={{borderWidth:1}}
                        inputContainerStyle={{borderWidth:2,borderRadius:15,padding:10,}}
                        inputStyle={{}}
                        value={email}
                        disabled
                        // onChangeText={(text)=> this.setState({ email : text})}
                        />
                </View>
                <View>   
                    <Input
                        placeholder='Username'
                        value={username}
                        inputContainerStyle={{borderWidth:2,borderRadius:15,padding:10,}}
                        disabled
                       />
                </View>
                <View>   
                    <Input
                        placeholder='Address1'
                        value={address1}
                        onChangeText={(text)=> this.setState({ address1 : text})}
                        // inputContainerStyle={{borderWidth:2,borderRadius:15,padding:10,}}
                        />
                </View>
                <View>   
                    <Input
                        placeholder='Address2'
                        value={address2}
                        onChangeText={(text)=> this.setState({ address2 : text})}
                        // inputContainerStyle={{borderWidth:2,borderRadius:15,padding:10,}}
                        />
                </View>
                <View>   
                    <Input
                        placeholder='Postal Code'
                        value={postalCode}
                        onChangeText={(text)=> this.setState({ postalCode : text})}
                        inputContainerStyle={{elvation:10,borderWidth:2,borderRadius:15,padding:10,}}
                       keyboardType="number-pad"
                       />
                </View>
                <View>   
                    <Input
                        placeholder='City'
                        value={city}
                        onChangeText={(text)=> this.setState({ city : text})}
                        inputContainerStyle={{borderWidth:2,borderRadius:15,padding:10,}}
                        />
                </View>
                <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite"   >
                <Button 
                    onPress={()=> this.handleCheck() } title="Place Order" 
                    // titleStyle={{color:"rgb(68,44,46)",fontWeight:'bold',}}
                    buttonStyle={{ alignSelf:'center' , backgroundColor:'#eb3838',width:250,padding: 10,borderRadius:10,}}
                    titleStyle={{color:"white",fontWeight:'bold'}}
                    // buttonStyle={styles.buttonContainer}
                     icon={
                        <Icon2
                        name="shoppingcart"
                        size={25}
                        color="white"
                        style={{paddingRight:20}}
                        />
                    }
                    />
                </Animatable.View>
                </ScrollView>
                </KeyboardAvoidingView >
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        // backgroundColor:'rgb(211,205,180)',
    },
    form:{
        flex:1,
        flexDirection:'column',
        margin:20,
        padding:20,
        backgroundColor:'white',
      elevation:10,
        // alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
    }
})


                {/* <Button title="Open Overlay" onPress={this.toggleOverlay()} />

<Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay()}>
    <Text>Hello from Overlay!</Text>
</Overlay> */}