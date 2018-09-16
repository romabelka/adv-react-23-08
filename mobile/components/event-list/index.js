import React, { Component } from 'react'
import { Text, ScrollView, SectionList } from 'react-native'

import { groupByAphabet, sortByAplhabet } from './utils';
import { styles } from "./styles";

class EventList extends Component {
	render() {
		return (
			<ScrollView>
				<SectionList
					renderItem={({item, index}) => <Text style={styles.text} key={index}>{item.title}</Text>}
					renderSectionHeader={({section: {title}}) => (
						<Text style={styles.title}>{title}</Text>
					)}
					sections={groupByAphabet(sortByAplhabet(this.props.events))}
				/>
			</ScrollView>
		)
	}
}

export default EventList