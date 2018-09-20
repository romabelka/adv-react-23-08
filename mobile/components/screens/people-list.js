import React, { Component } from 'react'
import { StyleSheet} from 'react-native'
import PeopleList from '../people/people-list'

class PeopleListScreen extends Component {
    static propTypes = {

    };

    render() {
        return <PeopleList />
    }

//    handleEventPress = ({ id, title }) => this.props.navigation.navigate('event', { id, title })
}

const styles = StyleSheet.create({

})

export default PeopleListScreen
