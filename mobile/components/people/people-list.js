import React, {Component} from 'react'
import {ActivityIndicator, SectionList, StyleSheet, Text} from 'react-native'
import {inject, observer} from 'mobx-react'
import groupBy from 'lodash/groupBy'
import Card from "../common/card";

@inject('people')
@observer
class PeopleList extends Component {
    static propTypes = {

    };

    render() {
        const grouped = groupBy(this.props.people.entities, person => person.lastName.charAt(0))
        const sections = Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} people`,
            data: list.map(person => ({key: person.id, person}))
        }))
        if (this.props.people.loading)
            return <ActivityIndicator />
        return <SectionList
            sections = {sections}
            renderSectionHeader = {({section}) => <Text style={styles.header}>{section.title}</Text>}
            renderItem = {({item}) => <Card>
                    <Text>{item.person.firstName} {item.person.lastName}</Text>
                </Card>
            }
        />
    }

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F0F0F0',
        height: 40,
        lineHeight: 40,
        marginBottom: 5,
        shadowOffset: {
            height: 2, width: 0
        },
        shadowOpacity: 0.3,
        elevation: 3
    }
})

export default PeopleList