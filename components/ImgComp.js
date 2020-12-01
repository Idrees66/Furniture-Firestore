import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'

 async function ImgComp() {
    const item = await this.props.item;
    const imgref = item.img;
    return (
        <View>
        {/* <Image source={{uri: imgref}} style={{width:120, height:120}} /> */}
        {/* <Text>{imgref}</Text> */}
        {console.log(imgref)}
        </View>
    )
}


// const ImgComp = ({img}) => {
//     return (
//         <Image
//         source={{uri: img}} style={{width:120, height:120}} />
//     )
// }

export default ImgComp

const styles = StyleSheet.create({

})
