import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Game: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Loading' as never);
        }}
      >
        <Text style={styles.buttonText}>Navigate to Loading</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    marginBotton: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    opacity: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    opacity: 1,
    letterSpacing: 0.25,
  },
  textInput: {
    height: 40,
    backgroundColor: 'rgba(60,60,60,.5)',
    color: 'white',
    opacity: 1,
  },
  textList: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
    opacity: 1,
  },
  buttonHistory: {
    borderColor: 'black',
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  backgroudView: {
    backgroundColor: 'grey',
    flex: 1,
    opacity: 0.8,
  },
});

export default Game;
