import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Dimensions, TextInput,FlatList, TouchableOpacity,AsyncStorage, Image, ScrollView, } from 'react-native'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase';
import firebaseConfig from '../config';
import './temp';
import FurnitureData from "./Data/FurnitureData";
import Data from './Data/FurnitureData.json';
// import ignoreWarnings from 'react-native-ignore-warnings';
// import Header from '../components/Header';
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

export default function Home() {
    //  state={
    //    username: "",
    //     Menu : Categories,
    //     // Furnitures: FurnitureData,
    //     CartTrolley : [],
    //     FList : [],
    //     tempFList : [],
    //     search : ""
    //  }
    const [vala, setVala] = useState(FurnitureData);
     const [username, setUsername] = useState("");
     const [Menu, setMenu] = useState(Categories);
     const [CartTrolley, setCartTrolley] = useState([]);
     const [FList, setFList] = useState([]);   
     const [tempFList, settempFList] = useState(FurnitureData);   
     const [search, setSearch] = useState("");  
     const [picsArray, setpicsArray] = useState([]);   
  
    useEffect(()=>{
        console.log("Home Screen Mounted")
        connection();
        checkUser();
        FetchFurniture();
        fetchImages()
    },[])
 
    
    function connection(){
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log("DataBase Running..")
        }
      }

      function checkUser(){
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            setUsername(user.displayName)
          } else {
          //  console.log('User')
          }
        });
      }

      function userSignOut(){
        firebase.auth().signOut()
        // .then(this.setState({userEmail: ""}))
        .then(()=>{
          _logOff();
          this.props.navigation.replace("Login")
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }  

    _logOff = async () => {
      try {
        await AsyncStorage.removeItem( 'username')
        await AsyncStorage.removeItem( 'password')
    console.log('Logging out..')
      } catch (error) {
        console.log(error)
      }
    };

    function FetchData(){
      console.log("fetching..")
      const db = firebase.firestore();
      db.collection("FurnitureData").get().then((querySnapshot) => {
          const tempFns = [];
          querySnapshot.forEach((doc) => {
              tempFns.push(doc.data());
              
          });
      
          setFList(tempFns)

      });
  }

  function fetchImages(){
    FList.map((x)=>{
      return (
        picsArray.push(x.img)
      )
    })
  }

  async function FetchFurniture(){
    console.log("Fetching Home Furnitures...")
    const db = firebase.firestore();
    const fref = db.collection("FurnitureData")
    const querySnapshot = await fref.get();
    const tempFns = [];
    querySnapshot.forEach((doc) => {
      const id = doc.id
                  tempFns.push({id, ...doc.data()} );
                  // console.log(`${doc.id} => ${doc.data()}`);
              });
              setFList(tempFns)
    // console.log("Snapshot: ", querySnapshot)
}


  function _search(text){
      console.log(text)
    if(text=="All"){
      this._search("")
    }
    else{
      var dataArray= [];
      FurnitureData.map((value)=>{
          if (value.title.indexOf(text) > -1 ){
              dataArray.push(value);    
          }
          if (value.category.indexOf(text) > -1 ){
            dataArray.push(value);    
        }
        console.log(dataArray.title)
        setFList(dataArray)
        setSearch(text)
   
      });
    }


  }


    const renderItemMenu = ({item}) => {

        return(
        <TouchableOpacity style={styles.MenuItem} key={item.id}
          onPress={()=>_search(item.title)}
         >
            <Text style={{fontSize:16,color:'rgb(68,44,46)', fontWeight:'bold' }}>{item.title}</Text>
        </TouchableOpacity>
        )
    }



   const renderItemFurniture = ({item,index}) => {
        // const {CartTrolley,FList} = this.state;


        return(
        <TouchableOpacity key={item.id} onPress={()=> this.props.navigation.navigate('Details',{item, CartTrolley})} 
        
         style={[styles.FurnitureItem, ]}>
              { console.log("Id => ",item.id) }

 {/* { console.log(item.title) } */}
            {/* <Animatable.Image animation="pulse" easing="ease-out" iterationCount="infinite" */}
            {/* <Image
              source={{uri: picsArray[index]}} style={{width:120, height:120}} /> */}
              {/* {console.log("../"+item.img)} */}
              {/* <Image
              source={{uri: item.img}} style={{width:120, height:120}} /> */}
            <Text style={{fontSize:18, color:"rgba(0, 0, 0,0.5)", fontWeight:'bold',}}>{item.title}</Text>   
            {/* <Text style={{fontSize:18, color:"rgba(0, 0, 0,0.5)", fontWeight:'bold',}}>{item.img}</Text>        */}
            <Text style={{fontSize:20,color:'rgb(68,44,46)',fontWeight:'bold'}}>{item.price} pkr</Text>
        </TouchableOpacity>
        )
    }

  
    // render() {
    //     const {CartTrolley,FList} = this.state;
    //     console.disableYellowBox = true;

      
        return (
            <SafeAreaView  style={styles.container}>
            {console.log("-------")}  
{/* ----------------------------------------------Home------------------------------------------------------------- */}

{/* { (FList==null) ? console.log("Furniture: ",FList[1]) : console.log("not exits") } */}
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>  userSignOut()}
             style={[styles.headerItem, {alignSelf:'flex-start'}]}>
                 <Icon2  name="logout" size={25} color="rgb(68,44,46)"  />
            </TouchableOpacity>
            <Text style={{width:135,fontWeight:'bold', fontSize:18, marginLeft:10, alignSelf: 'center',color: 'rgba(0,0,0,0.6)' }} >{username}</Text>
            <TouchableOpacity 
             style={[styles.headerItem, {marginLeft:30}]}>
                <Icon2  name="shoppingcart" size={25} color="rgb(68,44,46)"  />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Cart',{CartTrolley})}
             style={[styles.headerItem, {marginLeft:10}]} >
                <Icon1  name="align-right" size={25} color="rgb(68,44,46)"  />
            </TouchableOpacity>
        </View>

        {/* -------------------------------------------------------------------------------------------------- */}

            
               
        {/* -------------------------------------------------------------------------- */}
                <View style={styles.searchView}>
                    {/* <Icon2  name="search1" size={25} color="rgba(0,0,0,0.7)"  />        */}
                    <TextInput placeholder="Search Furniture"
                      // onChangeText={(text)=> this._search(text)}
                    placeholderTextColor="rgb(68,44,46)" style={styles.searchBar} />
                </View>

                <Animatable.View animation="slideInRight" easing="ease-out" >
                <FlatList
                    data={Menu}
                    renderItem={renderItemMenu}
                    keyExtractor={(item) => item.id}
                    horizontal={true}    
                    showsHorizontalScrollIndicator={false}    
                />
                </Animatable.View>
                <ScrollView>
                    <Image source={{uri: picsArray[5]}} style={{width:120, height:120}} />
                    <Image source={{uri: picsArray[5]}} style={{width:120, height:120}} />
                    <Image source={{uri: picsArray[1]}} style={{width:120, height:120}} />
                    <Image source={{uri: picsArray[2]}} style={{width:120, height:120}} />
                    <Image source={{uri: picsArray[2]}} style={{width:120, height:120}} />
                    <Image source={{uri: picsArray[2]}} style={{width:120, height:120}} />
              </ScrollView>
                <FlatList
                    // data={FurnitureData}
                    data={FList}
                    renderItem={renderItemFurniture}
                    // keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.column}  
                />
     {/* {console.log(picsArray[0])} */}

            </SafeAreaView >
        )
    }


const w = Dimensions.get("screen").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)',
       // backgroundColor:'rgb(255,240,232)',
        // alignItems: 'center',
        padding:20,
        marginTop:30,
        // flexDirection:'row',
      },
      header:{
        flexDirection: 'row',
        marginTop:20,
        width:w-30,   
    },
    headerItem:{
        width:45,
        height:45,
        //  backgroundColor:'#FFFFFF',
         backgroundColor:'rgb(211,205,180)',
        elevation:19,
        borderRadius:15,
        position:'relative',
        alignItems:'center',
        justifyContent:'center',
        // borderWidth:1,
        
    },
      searchView:{
          alignItems: 'center',
          marginTop:25,
      },
      searchBar:{
        fontSize:18,
        width:319,
        height:47,
        backgroundColor:'white',
        elevation:9,
        paddingHorizontal:40,
        // borderBottomLeftRadius:40,
        // borderTopRightRadius:40,
        borderLeftWidth:8,
        borderRightWidth:8,
        borderRadius:15,
        borderColor:'rgb(211,205,180)',
        borderWidth:1,
        // borderLeftColor: "rgb(68,44,46)",
        // borderColor: "rgb(68,44,46)",
        // borderBottomColor:'rgb(223,64,87)',
       //borderBottomWidth:3,
        // color:'rgba(0, 0, 0,1)'
      },
      MenuItem:{
        width:110,
        height:45,
        // backgroundColor:'#FFFFFF',
        borderLeftWidth:8,
        borderRightWidth:8,
        borderRadius:15,
        borderColor:'rgb(211,205,180)',
        borderWidth:1,
      //  backgroundColor:'rgb(255,240,232)',
        marginTop:25,
       // elevation:9,
        marginHorizontal:10,
        borderBottomLeftRadius:30,
        borderTopRightRadius:30,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        // elevation:5,
        // borderWidth:2,
      },
      FurnitureItem:{
        width:w/2-30,
        height:w-90,
        backgroundColor:'#FFFFFF',
       // backgroundColor:'rgb(211,205,180)',
        // borderColor:'rgb(211,205,180)',
        // borderWidth:5,
       marginVertical:0,
       marginHorizontal:0,
        // elevation:9,
        marginHorizontal:5,
        alignItems:'center',
        justifyContent:'center',
        // borderBottomLeftRadius:50,
        // borderTopRightRadius:50,
        // borderRadius:50,
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        borderBottomWidth:7,
        borderBottomColor:'rgb(211,205,180)',
        marginTop:10,
        marginBottom:10,

        shadowColor: "rgb(0, 93, 255)",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 5,
      //  borderWidth:3,

      

      },
      buttonContainer:{
        marginTop:10,
        marginBottom:0,
        borderBottomLeftRadius:50,
        borderTopRightRadius:50,
        backgroundColor:'rgb(211,205,180)',
        width:264,
        height:54,
        alignSelf:'center',
      }
})
