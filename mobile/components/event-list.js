import React, { Component } from 'react'
import {StyleSheet, Text, ScrollView, View, SectionList} from 'react-native'

class EventList extends Component {
    static propTypes = {

    };

    genCharArray = (charA, charZ) => {
      let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0)
      for (; i <= j; ++i) {
        a.push(String.fromCharCode(i))
      }
      return a
    }

    genAlphabetList = () => {
      const { events } = this.props

      const alphabet = this.genCharArray('a', 'z').concat(this.genCharArray('0', '9'));

      let alphabetEvents = [];

      alphabet.forEach((letter) => {
        let eventData = events.filter(event => event.title[0].toLowerCase() === letter)
        if (eventData.length) {
          alphabetEvents.push({
            letter,
            data: eventData
          })
        }
      })

      return alphabetEvents
    }

    render() {
        const alphabetEvents = this.genAlphabetList()
        return (
            <View>
              <SectionList
                sections={alphabetEvents}
                renderItem={({ item }) => <View style={styles.event}><Text>{item.title}</Text></View>}
                renderSectionHeader={({section}) => <View style={styles.title}><Text style={styles.titleText}>{section.letter.toUpperCase()} - {section.data.length} events</Text></View>}
                keyExtractor={(item) => item.id}
              />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  event: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  title: {
    padding: 10,
    backgroundColor: '#fff'
  },
  titleText: {
    fontSize: 24
  }
})

export default EventList