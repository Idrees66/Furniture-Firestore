import React, { Component } from 'react'
import { Text, StyleSheet, View,Dimensions,TouchableOpacity,Alert } from 'react-native'
import { Input ,Button} from 'react-native-elements';
import * as firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import firebaseConfig from '../config';
//config run krna ha

export default class signUp extends Component {

    state={
        username:"",
        email : "",
        Password : ""
    }
    
    componentDidMount() {
        this.connection(); 
      }

      
    
      connection(){
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log("DataBase Running..")
        }
      }
    userSignUp(email, password){
      const {username} = this.state;
        // console.log(this.state)
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            const user = firebase.auth().currentUser;
            user.updateProfile({
              displayName: username,
            })
            this.addUser(email,password,username)
            this.props.navigation.replace("Login")
        })
        .catch(error => {
            Alert.alert(error.message)
        })
    }

    addUser(email, password,username){
        const user = {
          email: email,
          username: username,
          // password: password,
        };
    
        const db = firebase.firestore();
        db.collection("Users").add(user)
        .then(function(docRef) {
          //  alert("Successfully Added")
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
      }

    render() {
        const {email,username,Password} = this.state;
        return (
            <View style={styles.container} >
                {/* <Text > login </Text> */}
                <Animatable.View animation="fadeInUp" duration={2000}
                 style={{width:w-60,elevation:10,borderRadius:15, alignItems: 'center',justifyContent:'center' ,backgroundColor:'white',padding:10,height:w+70}}>
                <Input
                  placeholder='username'
                  value={username}
                  onChangeText={(text)=> this.setState({ username : text})}
                />
                <Input
                  placeholder='Email'
                  value={email}
                  onChangeText={(text)=> this.setState({ email : text})}
                />
                <Input
                  placeholder='Password'
                  value={Password}
                  onChangeText={(text)=> this.setState({ Password : text})}
                />
                <Button
                  title="Sign Up"
                  // type="outline"
                  primary
                  onPress={()=>this. userSignUp(email, Password)}
                  buttonStyle={{backgroundColor:'#eb3838',width:150,padding: 10,borderRadius:10,}}
                  titleStyle={{color:"white",fontWeight:'bold'}}
                />
                <TouchableOpacity onPress={()=> this.props.navigation.navigate("Login")}  >
                        <Text style={{padding:10}}> Already have an account ?</Text>  
                </TouchableOpacity>
                </Animatable.View >
            </View>
        )
    }
}

const w = Dimensions.get("screen").width;
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'rgb(246,247,249)',
        alignItems: 'center',
        // justifyContent: 'center',
        padding:20,
        paddingTop:70,
        width:w
      },
})
