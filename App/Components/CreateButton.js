import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
class CreateButton extends Component {
 render() {
   return (
     <TouchableOpacity
       style={styles.backButton}
       onPress={() => {
         this.props.navigation.navigate('Reservation');
       }}
     >
      <Text>Create</Text>
     </TouchableOpacity>
   );
 }
}
const styles = StyleSheet.create({
 backButton: {
   height: 44,
   width: 44,
   justifyContent: 'center',
   alignItems: 'center',
 },
});
export default withNavigation(CreateButton);