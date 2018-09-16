import React, {Component} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'

class Event extends Component {
    render() {
        const { title, when, url } = this.props.event
        return (
            <View>
                <Image source={{ uri: 'http://lorempixel.com/400/200'}}
                    style = {styles.image}
                />
                <Text>{title}</Text>
                <Text>{when}</Text>
                <Text>{url}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 100
    }
})

export default Event