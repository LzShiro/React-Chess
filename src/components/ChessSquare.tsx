import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import ChessSquareProps from '../types/ChessSquareProps';

const ChessSquare: React.FC<ChessSquareProps> = ({ onPress, isDark }) => {
  const squareColor = isDark ? styles.darkSquare : styles.lightSquare;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.square, squareColor]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: { width: 50, height: 50 },
  lightSquare: { backgroundColor: 'white' },
  darkSquare: { backgroundColor: 'black' },
});

export default ChessSquare;
