import React, { Component } from 'react'
import { StyleSheet} from 'react-native'
import PeopleList from '../people/people-list'
import data from '../../fixtures'
const peopleList = Object.entries(data.people).map(([ id, person ]) => ({ id, ...person }))

class PeopleListScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'people list'
    }

    render() {
        return <PeopleList people = {peopleList} />
    }

//    handleEventPress = ({ id, title }) => this.props.navigation.navigate('event', { id, title })
}

const styles = StyleSheet.create({
})

export default PeopleListScreen