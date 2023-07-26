import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

const Loading = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Stats' as never);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Pawn.png')}
        style={[styles.pawnImage, styles.shadow]}
      />
      <Text style={styles.text}>Loading...</Text>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  pawnImage: {
    width: 400,
    height: 400,
    marginTop: 30,
    marginBottom: 30,
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default Loading;
