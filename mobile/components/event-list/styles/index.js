import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
	text: {
		paddingTop: 6,
		paddingRight: 16,
		paddingLeft: 16,
		paddingBottom: 6,
		fontSize: 13,
		lineHeight: 20,
		fontFamily: 'Arial',
		alignSelf: 'center'
	},
	title: {
		width: '100%',
		paddingTop: 6,
		paddingBottom: 6,
		fontSize: 15,
		lineHeight: 24,
		fontFamily: 'Arial',
		textShadowColor: 'rgba(0, 0, 0, 1)',
		textShadowOffset: {width: 1, height: 1},
		textShadowRadius: 1,
		backgroundColor: 'rgba(255, 0, 0, 1)',
		textAlign: 'center',
		color: '#fff'
	}
});