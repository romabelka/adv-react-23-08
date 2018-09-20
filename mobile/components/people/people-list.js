import React, { Component } from 'react'
import {Text, ScrollView} from 'react-native'

class PeopleList extends Component {
    static propTypes = {

    };

    render() {
        return <ScrollView>
          { (this.props.people || []).map((person) => (
            <Text key ={person.id}>{ person.firstName } {person.lastName}</Text>
          )) }
        </ScrollView>
    }
}

export default PeopleList