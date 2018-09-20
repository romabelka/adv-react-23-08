import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import PeopleList from '../people/people-list'
import Loader from '../common/loader'

@inject('people')
@observer
class PeopleListScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'people list'
    }
    
    componentDidMount() {
      this.props.people.loadPeople()
    }

    render() {
      const people = this.props.people.people;
      return people ? <PeopleList people = {people} /> : <Loader />
    }
}

const styles = StyleSheet.create({
})

export default PeopleListScreen