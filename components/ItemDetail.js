import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView,Dimensions, TouchableOpacity,FlatList,Image } from 'react-native'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as FileSystem from 'expo-file-system';

const w = Dimensions.get("screen").width;
const h = Dimensions.get("screen").height;

export default class ItemDetail extends Component {

    state={
        // Position : FurnitureData,
        itemDet : this.props.route.params.item,
        MainPic : null,
        Quantity: 1,
        CartBasket: [],
        status: "",
        cashedimagesArray:[],
    }

    componentDidMount() {
        console.log("Item Detail Screen Mounted")
        this.cacheFirebaseAssets();
        const temp = this.state.itemDet.img
        this.setState({
            MainPic: temp
        })
    }

    componentWillUnmount(){
        this.setState({ cashedimagesArray : []})
    }
    cacheImages = async(uri, docID,index)=>{
        await FileSystem.downloadAsync(
          uri,
          FileSystem.documentDirectory +docID.toString() +[index] +  ".png"
        ).then(({uri})=>{
            this.state.cashedimagesArray.push(uri)
           // console.log("Images cached successfully..",this.state.cashedimagesArray)
        })
   
      }


      cacheFirebaseAssets = async()=>{
            const id =  this.state.itemDet.id;
            this.state.itemDet.images.forEach((imgref,index)=>{
                this.cacheImages(imgref,id,index)
                // console.log("index: ",index)
            })
        //   this.cacheImages(doc.data().img,doc.id)
            //  console.log(doc.data().img);
       
      }

    _rating(item){
        let rating = []
        for(let i=0;i<item;i++){
            rating.push(
                <Image
                
                  source={require('../assets/star2.png')}
                  style={{width:15 , height:15, marginRight:3  }}
                  resizeMode="cover"  />
            )
        }
        return rating;
    }



    renderItemPosition = ({item,index}) => {
        return(

                <TouchableOpacity style={styles.PositionItem} onPress={()=>this.setState({MainPic: item})} >
                 <Image source={{uri : item}} style={{width:50, height:50}} resizeMode="contain" />
                </TouchableOpacity>
    

        )
    }

    renderItemColors = ({item,index}) => {
        const col = item;
        return(
            
        <TouchableOpacity
         style={{backgroundColor: item, borderRadius:20, width:25, height:25, marginVertical:10,borderWidth:1}}  >
       {/* {  console.log(item)} */}
        </TouchableOpacity>
        )
    }

    increaseQuantity = () => {
           const {Quantity} = this.state;
           const q = Quantity + 1
           this.setState({
                Quantity : q
            })
        }

    decreaseQuantity = () => {
            const {Quantity} = this.state;
            const q = Quantity - 1;
            if(Quantity > 1){
                this.setState({ Quantity : q })
            }
         }
    
    addToCart=()=>{
      
        const {CartTrolley } = this.props.route.params;
        const {Quantity,itemDet, status} = this.state;
        alert(" Added to Cart..")
        CartTrolley.push(this.state.itemDet);

    }

   

    render() {

        const {itemDet,CartBasket} = this.state;
        const {CartTrolley } = this.props.route.params;

        return (
            <SafeAreaView style={styles.container}>
{/* -------------------------------------------------------------------------------------------------------- */}
{console.log("------------------------------------------------------------------------")}
{console.log(this.state.cashedimagesArray)}
{console.log("------------------------------------------------------------------------")}
<View style={styles.header}>
            <TouchableOpacity onPress={()=>  this.props.navigation.goBack()}
             style={[styles.headerItem, {alignSelf:'flex-start'}]}>
                 <Icon2  name="back" size={25} color="rgba(0,0,0,0.7)"  />
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=> this.props.navigation.navigate('Cart',{CartTrolley})} 
             style={[styles.headerItem, {marginLeft:30}]}>
                <Icon2  name="shoppingcart" size={25} color="rgba(0,0,0,0.7)"  />
            </TouchableOpacity>
        </View>

{/* -------------------------------------------------------------------------------------------------------- */}

                <View style={{   flexDirection: 'row', marginTop:0, width:w-30, justifyContent:'space-between',padding:20    }}>
                    <View style={styles.showFurniture}>
                        <Animatable.Image animation="pulse" easing="ease-out" iterationCount="infinite"  source={{uri: this.state.MainPic}} style={{width:140, height:140}} />
                    </View>
                    <View style={styles.colors}>
                            <View style={{ flex:1, justifyContent:"center", alignItems:'center', marginTop:10}}>
                                <FlatList
                                    data={itemDet.colors}
                                    renderItem={this.renderItemColors}
                                    keyExtractor={(item,index) => item.id} 
                                />
                                </View>
                    </View>
                </View>

{/* -------------------------------------------------------------------------------------------------------- */}
{/* animation="slideInRight" */}
{/* {(this.state.cashedimagesArray) 
? ( */}

  <View   > 
      {/* {console.log(this.state.cashedimagesArray)} */}
  <FlatList
       data={this.state.cashedimagesArray}
      //data={this.state.itemDet.images}
      renderItem={this.renderItemPosition}
      keyExtractor={(item,index) => index}
      horizontal={true}    
      showsHorizontalScrollIndicator={false}    
  />
</View>
 {/* )
  : console.log("false")} */}
          
{/* -------------------------------------------------------------------------------------------------------- */}

            <View style={{   flexDirection: 'row', marginTop:0, width:w-30, justifyContent:'space-between',padding:20    }}>
                    <Animatable.View animation="fadeIn" duration={1500} style={styles.ratingContainer}>
                    <Text style={{fontSize:16,color:"rgb(228, 150, 6)", fontWeight:'bold',fontSize:18}}>{itemDet.title}</Text>
                    <View style={{ marginTop:5, marginBottom:5, flexDirection: 'row',}} >
                          {this._rating(itemDet.rating)}
                    </View>
                    <Text style={{fontSize:16,fontSize:20,color:"rgba(0, 0, 0,0.5)",fontWeight:'bold'}}>{itemDet.price} pkr</Text>
                    </Animatable.View>
                    <View style={styles.noOfItems}>
                        <TouchableOpacity onPress={this.decreaseQuantity} >
                        <Text style={{fontSize:20,fontWeight:'bold',          backgroundColor:'#FFFFFF',paddingHorizontal:12,borderRadius:35}}>-</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize:20,fontWeight:'bold', }}> { this.state.Quantity} </Text>
                        <TouchableOpacity onPress={this.increaseQuantity} >
                        <Text style={{fontSize:20,fontWeight:'bold', backgroundColor:'#FFFFFF',paddingHorizontal:10,borderRadius:35}}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

{/* -------------------------------------------------------------------------------------------------------- */}

        {/* <View style={{alignItems:'center',paddingHorizontal:20}}> */}
        <Text style={{fontSize:18,  textAlign:'center',color:'rgba(0,0,0,0.7)',paddingVertical:0 }}>{itemDet.description}</Text>
        {/* </View> */}
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite"   >
        <Button 
         onPress={()=> this.addToCart()} title="Add to Cart" titleStyle={{color:"rgb(68,44,46)",fontWeight:'bold',margin:10}} buttonStyle={styles.buttonContainer}
          icon={
            <Icon2
              name="shoppingcart"
              size={25}
              color="rgb(68,44,46)"
              style={{paddingRight:20}}
            />
          }
        />
        </Animatable.View>

          
{/* -------------------------------------------------------------------------------------------------------- */}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
         backgroundColor: '#F8F8F8',
        padding:20,
        marginTop:30,
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
        backgroundColor:'rgb(211,205,180)',
          elevation:9,
          borderRadius:15,
          position:'relative',
          alignItems:'center',
          justifyContent:'center',
        //   borderWidth:2,
          
      },
      showFurniture:{
          width:200,
          height:200,
        //  backgroundColor:'#FFFFFF',
        // backgroundColor:'rgb(66,211,145)',
        // backgroundColor:'rgb(211,205,180)',
        backgroundColor:"rgb(244,244,244)",
        borderColor:'rgb(211,205,180)',
        borderWidth:3,
        // borderWidth:2,
          elevation:10,
          borderRadius:15,
          justifyContent:'center',
          alignItems: 'center',
      },
      colors:{
        width:50,
        height:200,
        backgroundColor:'#FFFFFF',
       borderColor:'rgb(211,205,180)',
       borderWidth:4,
    //    borderWidth:2,
       elevation:10,
        // borderTopRightRadius:40,
        // borderBottomLeftRadius:40,
        borderRadius:40
    
      },
      PositionItem:{
        width:75,
        height:65,
        backgroundColor:'#FFFFFF',
        borderLeftWidth:6,
        borderRightWidth:6,
        borderRadius:15,
        borderColor:'rgb(211,205,180)',
        borderWidth:1,
        marginTop:5,
        elevation:9,
        marginHorizontal:10,
        borderTopLeftRadius:30,
        borderBottomRightRadius:30,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        // borderWidth:2,
      //  backgroundColor:'rgb(222,63,86)',
      },
      noOfItems:{
        width:50,
        height:150,
        // backgroundColor:'#FFFFFF',
        backgroundColor:'rgb(211,205,180)',
        elevation:10,
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center',

      },
      ratingContainer:{
        width:200,
        height:150,
         backgroundColor:'#FFFFFF',
       // backgroundColor:'rgb(211,205,180)',
        borderColor:'rgb(211,205,180)',
        borderWidth:5,
        elevation:10,
        borderRadius:15,
        justifyContent:'center',
        alignItems: 'center',
        borderTopRightRadius:60,
        borderBottomLeftRadius:60,
     //   backgroundColor:'rgb(15,186,183)',
     //   backgroundColor:'rgb(222,63,86)',
        // borderWidth:2,
    },
    
      buttonContainer:{
        marginTop:10,
        marginBottom:0,
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
