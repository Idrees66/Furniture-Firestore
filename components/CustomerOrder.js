import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, FlatList, Image ,} from 'react-native'
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
// import * from 'firebase/firestore';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import firebaseConfig from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  LogBox } from "react-native";

Categories = [   {
  id: "1",
  title: "All",
},
{
  id: "2",
  title: "chair",
},
{
  id: "3",
  title: "sofa",
},
{
  id: "4",
  title: "bed",
},
]
;


export default class CustomerOrder extends Component {

    state={
      username: "",
      useremail: "",
      placedOrder:[],
      Orders:[],
    }
    componentDidMount() {
      console.log("Customer Order Screen Mounted")
        this.connection();
        //  this.UsersOrder();
         this.checkUser();
         this.PerformQuery();
       
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
            // console.log(user)
          this.setState({
              username: user.displayName,
              useremail : user.email
          })
          } else {
          //  console.log('User')
          }
        });
      }



        PerformQuery(){
          const {placedOrder,useremail,username} = this.state;
          console.log("-------Performing query---->>", username)
        
        // "bro@email.com"
          const db = firebase.firestore();
          db.collection("Orders").where("email", "==", "bro@email.com")
          .get()
          .then((querySnapshot) => {
             const temp =[];
              querySnapshot.forEach((doc) => {
              
              temp.push(doc.data().cart)
              this.setState({ placedOrder: temp })

              });
                  
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });
        }

        renderCart = ({item}) => {
          return(
          
                  <Animatable.View animation='slideInDown' duration={2000}
                    style={styles.CartItemContainer}>
               
                      <View style={{marginLeft:20}}>
                          <Text style={{fontSize:20, color:"black",fontSize:18, width:100,color:"rgb(228, 150, 6)", fontWeight:'bold',}}>{item.title}</Text>
                          <Text  style={{fontSize:16,fontSize:20, padding:5,color:"black",fontWeight:'bold'}} >{item.price} pkr </Text>
                      
                      </View>
                
                          <Animatable.Image animation="pulse" easing="ease-out" iterationCount="infinite"
                           source={{uri: item.cachedImg}} style={{width:140, height:140}} />
        
                  </Animatable.View> 
          )
      }

    render() {
        // const {CartBasket } = this.state;
        const {UserOrder, username,placedOrder} = this.state;
   
        console.disableYellowBox = true;
        return (
            <SafeAreaView style={styles.conatiner} >
           
                <Text style={{fontSize: 30, padding:10, alignSelf: 'center',color:"rgba(0,0,0,.6)" ,fontWeight:'bold'}} > {username}'s Order </Text>
                {/* <Text>{this.state.useremail}</Text> */}

                <FlatList
                    data={placedOrder[0]}
                    renderItem={this.renderCart}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />


            </SafeAreaView>
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

})
