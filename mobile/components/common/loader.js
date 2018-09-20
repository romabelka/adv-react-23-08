import React, { Component } from 'react'
import {View, StyleSheet, Text} from 'react-native'

class Loader extends Component {
    static propTypes = {

    };

    render() {
        return (
            <View>
                <Text>...Loading</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create()

export default Loader