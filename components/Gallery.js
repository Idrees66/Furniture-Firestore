import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, Dimensions, TextInput,FlatList, TouchableOpacity,AsyncStorage , Image, ScrollView, Alert, } from 'react-native'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase';
import firebaseConfig from '../config';
import './temp';
import * as FileSystem from 'expo-file-system';
// import {FileSystem } from 'expo';

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

export default class Gallery extends Component {
     state={
       username: "",
       useremail : "",
        Menu : Categories,
        // Furnitures: FurnitureData,
        CartTrolley : [],
        FList : [],
        tempFList : [],
        search : "",
        Mount :false,
        favIcon: "hearto",
        wishList: []
     }
  

     
     componentDidMount() {
      // ignoreWarnings('Setting a timer');
        this.insert();
        // console.log("Home Screen Mounted", this.state.Mount)
        // this.connection();
        // this.checkUser();
        // this.FetchFurniture();
        // this.cacheFirebaseAssets();
      }

      insert(){
        if(!this.state.Mount)
        console.log("Home Screen Mounted", this.state.Mount)
        this.connection();
        this.checkUser();
        this.FetchFurniture();
        this.cacheFirebaseAssets();
        this.setState({Mount:true})
      }

    
      connection(){
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log("DataBase Running..")
        }
      }

      cacheImages = async(uri, docID)=>{
        await FileSystem.downloadAsync(
          uri,
          FileSystem.documentDirectory +docID.toString() + ".png"
        ).then(({uri})=> console.log("Assets cached successfully.."))
      }


      cacheFirebaseAssets = async()=>{
        const db = firebase.firestore();
        const locationRef = db.collection("FurnitureData");
        const querySnapshot = await locationRef.get();
        querySnapshot.forEach((doc) => {
          this.cacheImages(doc.data().img,doc.id)
            //  console.log(doc.data().img);
        
          });
      }
  
      
  

      async FetchFurniture(){
        console.log("Fetching Furnitures...")
        const db = firebase.firestore();
        const fref = db.collection("FurnitureData")
        const querySnapshot = await fref.get();
        const tempFns = [];
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            const data = doc.data();
            const cachedImg = FileSystem.documentDirectory+doc.id+".png"
            tempFns.push({id, ...data, cachedImg});
          
            });
            // console.log(tempFns)
            this.setState({FList: tempFns})
            this.setState({tempFList : tempFns})
        // console.log("Snapshot: ", querySnapshot)
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

      userSignOut(){
        firebase.auth().signOut()
        // .then(this.setState({userEmail: ""}))
        .then(()=>{
        
          this._logOff()
          this.props.navigation.replace("Login")
        }
         )
        .catch(error=>{
            Alert.alert(error.message)
        })
    }  


    _logOff = async () => {
      // this.props.route.params;
      try {
        // this.setState({email: "", Password:""})
        // await AsyncStorage.removeItem( 'username')
        // await AsyncStorage.removeItem( 'password')
        await AsyncStorage.clear();
        console.log('Logging out..')
      } catch (error) {
        console.log(error)
      }
    };
  
    renderItemMenu = ({item}) => {

        return(
        <TouchableOpacity  style={styles.MenuItem}
         onPress={()=>this._search(item.title)}
         >
            <Text style={{fontSize:16,color:'rgb(68,44,46)', fontWeight:'bold' }}>{item.title}</Text>
        </TouchableOpacity>
        )
    }

   async addFavourite(item){
     console.log("inside fav")
      const {wishList}= this.state;
      wishList.push(item);
      const tempWish = this.state.wishList;
      try {
        await AsyncStorage.setItem( 'wishList',JSON.stringify(tempWish))
        Alert.alert("You have Successfuly Added to favourite")
      } 
      catch (error) {
        console.log(error)
      }
      
    }

    addtoFavourite(item){
      const {wishList}= this.state;
        wishList.push(item);
          const wish = {
            wishList : wishList,
            username: this.state.username,
            useremail : this.state.useremail
          };
    // console.log("WishList ",wishList)
        const db = firebase.firestore();
        var docID = "";
      db.collection("Favourites").where("useremail", "==", "bro@email.com").get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log('No matching documents.');
            db.collection("Favourites").add(wish)
            .then(function(docRef) {
                Alert.alert("You have Successfuly Added to favourite")
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }  
         querySnapshot.forEach((doc) => { 
           docID = doc.id
          // console.log(doc.id, '=>', doc.data().title);
         });

         db.collection("Favourites").doc(docID).update(wish)
         .then(function(docRef) {
             Alert.alert("You have Successfuly Added to favourite")
         })
         .catch(function(error) {
             console.error("Error adding document: ", error);
         });

      })}

    

    renderItemFurniture = ({item,index}) => {
        const {CartTrolley,FList} = this.state;
       return(
        <View key={item.id}
        
         style={[styles.FurnitureItem, ]}>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Details',{item, CartTrolley})} >
          <Animatable.View animation="slideInUp"  duration={2000}
            style={{backgroundColor:"rgb(244,244,244)", borderRadius:20,marginTop:-70,}}>
                <Animatable.Image animation="pulse" easing="ease-out" iterationCount="infinite"
                source={{uri: item.cachedImg}} style={{width:120, height:120}} />
            </Animatable.View>

         </TouchableOpacity>
               
             <Animatable.View animation="fadeIn" delay={1000} style={styles.itemInfo}>
               
               <View style={{alignItems: 'center',maxWidth:100}}>
              <Text style={{fontSize:18, color:"rgb(228, 150, 6)", fontWeight:'bold',}}>{item.title}</Text>   
              <Text style={{fontSize:20,color:'rgb(68,44,46)',fontWeight:'bold'}}>{item.price} pkr</Text>
              </View>

              <TouchableOpacity style={{alignItems: 'center',}} onPress={()=>this.addFavourite(item)} >
                 <Icon2  name="hearto" size={25} color="rgba(0,0,0,0.2)"  />
            </TouchableOpacity>

             </Animatable.View>

        </View>
        )
    }

    _search(text){
      // console.log("inside search: ",text)
     const all = this.state.tempFList
      if(text=="All"){
        this.setState({FList:all})
      }
      else{
        var dataArray= [];
        this.state.tempFList.map((value)=>{
            if (value.title.indexOf(text) > -1 ){
                dataArray.push(value);    
            }
            if (value.category.indexOf(text) > -1 ){
              dataArray.push(value);    
             
          }
            this.setState({
                FList:dataArray,
                search:text
            })
        });
      }
      // console.log("Temp Flist ",  dataArray)
  }

    render() {
        const {CartTrolley,FList} = this.state;
        console.disableYellowBox = true;

        const imgsrc = "https://firebasestorage.googleapis.com/v0/b/furniture-shop-2131c.appspot.com/o/Furniture_Images%2FGreen%20Bergamo%20High%20Wing%20Chair.G03.watermarked.2k.png?alt=media&token=ade84991-7c35-476e-b045-5588323d6ddc";
      
        return (
            <SafeAreaView  style={styles.container}>
            {console.log("-------")}  
{/* ----------------------------------------------Home------------------------------------------------------------- */}

{/* { (FList==null) ? console.log("Furniture: ",FList[1]) : console.log("not exits") } */}
        <View style={styles.header}>
       
            <TouchableOpacity onPress={()=>  this.userSignOut()}
             style={[styles.headerItem, {alignSelf:'flex-start'}]}>
                 <Icon2  name="logout" size={25} color="rgb(68,44,46)"  />
            </TouchableOpacity>
            <Text style={{width:135,fontWeight:'bold', fontSize:18, alignSelf: 'center',color: 'rgba(0,0,0,0.6)' }} >{this.state.username}</Text>
            {/* <TouchableOpacity 
             style={[styles.headerItem, {marginLeft:30}]}>
              <Icon1  name="align-right" size={25} color="rgb(68,44,46)"  />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Cart',{CartTrolley})}
             style={[styles.headerItem, ]} >
                <Icon2  name="shoppingcart" size={25} color="rgb(68,44,46)"  />
            </TouchableOpacity>
        </View>

        {/* -------------------------------------------------------------------------------------------------- */}

            
               
        {/* -------------------------------------------------------------------------- */}
                <View style={styles.searchView}>
                    {/* <Icon2  name="search1" size={25} color="rgba(0,0,0,0.7)"  />        */}
                    <TextInput placeholder="Search Furniture"
                      onChangeText={(text)=> this._search(text)}
                    placeholderTextColor="rgb(68,44,46)" style={styles.searchBar} />
                </View>

                <Animatable.View animation="slideInRight" easing="ease-out" >
                <FlatList
                    data={this.state.Menu}
                    renderItem={this.renderItemMenu}
                     keyExtractor={this._keyExtractor}
                    horizontal={true}    
                    showsHorizontalScrollIndicator={false}    
                />
                </Animatable.View>
          
                <FlatList
                    data={this.state.FList}
                    renderItem={this.renderItemFurniture}
                    keyExtractor={this._keyExtractor}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.column}  
                    style={{paddingTop:20}}
                />
               

                {/* <Button onPress={()=>alert("Thanks..")} title="Show More"
                titleStyle={{color:"rgb(68,44,46)",fontWeight:'bold',}} 
                buttonStyle={styles.buttonContainer} />
   */}
            </SafeAreaView >
        )
    }
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
        width:w-40,   
        justifyContent:'space-between',
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
        height:190,
        // height:w-90,
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
        borderRadius:30,
        // borderTopRightRadius:50,
        // borderTopLeftRadius:50,
        borderBottomWidth:7,
        borderBottomColor:'rgb(211,205,180)',
        marginTop:30,
        marginBottom:50,
        // marginTop:10,
        // marginBottom:10,

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
      },
      itemInfo:{
        // flex:1,
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems: 'center',
        width:w/3,
        paddingTop:20
      }
})
