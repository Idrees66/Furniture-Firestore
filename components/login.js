import React, { Component } from 'react'
import { Text, StyleSheet, View,Dimensions,TouchableOpacity, Alert, AsyncStorage } from 'react-native'

import { Input ,Button} from 'react-native-elements';
import * as firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { NeuView } from 'react-native-neu-element';
import firebaseConfig from '../config';


export default class login extends Component {

    state={
      
        email : "",
        Password : "",
        // logFlag : this.props.route.params.log || false
    }


    componentDidMount() {
      console.log("Login screen mounted")   
      this.connection();
      this._retrieveData();
    }

  
    connection(){
      if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
          console.log("DataBase Running..")
      }
    }

    handleSubmit(){
      const {email,Password} = this.state;
      // this._storeData();
      this.userSignIn(email,Password);
  
    }

    _logOff = async () => {
      // this.props.route.params;
      try {
        this.setState({email: "", Password:""})
        // await AsyncStorage.removeItem( 'username')
        // await AsyncStorage.removeItem( 'password')
        await AsyncStorage.clear();
        console.log('Logging out..')
      } catch (error) {
        console.log(error)
      }
    };

    _storeData = async () => {
      try {
        await AsyncStorage.setItem( 'username', this.state.email)
        await AsyncStorage.setItem( 'password', this.state.Password)
        //await AsyncStorage.multiSet([[ 'username', this.state.email],['password', this.state.pass]]);
      //  console.log("Storing", check)
      } catch (error) {
        console.log(error)
      }
    };

    _retrieveData = async () => {
      try {
        console.log("Retrieving")
        const uemail = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');
        console.log("Stored password: ",password)
        if (uemail !== null) {
          console.log(uemail)
          this.setState({email: uemail})
        }
        if (password !== null) {
          console.log(password)
          this.setState({Password: password})
        }
        // this.userSignIn(this.state.email,this.state.Password)
      } catch (error) {
        console.log(error)
        // Error retrieving data
      }
    };


    userSignIn(email,pass){
      firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(()=>{
        console.log("Credentials verifed..")
        this.props.navigation.replace("Home")
        // {logout: this._logOff(),email: email, Password: pass}
      })
      .catch((error)=> {
        Alert.alert(error.message)
      });
    }



    render() {
        const {email,Password} = this.state;
        return (
            <SafeAreaView style={styles.body} >
              {/* <Text>email: {this.state.email}</Text>
              <Text>password: {this.state.Password}</Text> */}
            <Animatable.View animation="zoomInUp" duration={2000} style={styles.container}>
                <Input
                  placeholder='Email'
                  value={email}
                  onChangeText={(text)=> this.setState({ email : text})}
                />
                <Input
                  placeholder='Password'
                  value={Password}
                  secureTextEntry={true}
                  onChangeText={(text)=> this.setState({ Password : text})}
                />
                <Button
                  title="LOGIN"
                  // type="outline"
                  primary
                //  onPress={()=>this.handleSubmit()}
                  //Direct Login without authentication
                   onPress={()=>  this.props.navigation.replace("Home")}
                  buttonStyle={{backgroundColor:'#cc0e86',width:150,padding: 10,borderRadius:10,}}
                  titleStyle={{color:"white",fontWeight:'bold'}}
                />
                <TouchableOpacity onPress={()=> this.props.navigation.navigate("SignUp") } >
                        <Text style={{padding:10}}> Don't have an account ?</Text>  
                </TouchableOpacity>
                {/* <NeuView color='blue' height={100} width={100} borderRadius={16}>
                  <Text>something</Text>
                </NeuView> */}
                </Animatable.View>
            </SafeAreaView>
        )
    }
}

const w = Dimensions.get("screen").width;
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'rgb(246,247,249)',
        alignItems: 'center',
        justifyContent: 'center',
        padding:20,
        // paddingTop:70,
        width:w
      },
      container:{
        width:w-60,
        elevation:10,
        borderRadius:15, 
        alignItems: 'center',
        justifyContent:'center' ,
        backgroundColor:'white',
        padding:10,
        height:w+70
    }
})
