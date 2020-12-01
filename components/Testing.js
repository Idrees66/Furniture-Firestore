import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'galio-framework';


export default class Testing extends Component {
    render() {
        return (
            <View>
<Button capitalize size="small">small size capitalize</Button>
<Button round uppercase color="error">round uppercase</Button>
<Button onlyIcon icon="tags" iconFamily="antdesign" iconSize={30} color="warning" iconColor="#fff" style={{ width: 40, height: 40 }}>warning</Button>
<Button color="#50C7C7" shadowless>custom color and shadowless</Button>
<Button shadowColor={true} round size="small" color="success">round and small</Button>

          </View>
        )
    }
}

const styles = StyleSheet.create({})
