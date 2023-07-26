import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { ChessPiece } from '../types/ChessboardData';
interface ChessSquareProps {
  color: 'white' | 'black';
  piece?: ChessPiece;
  onPress?: () => void;
}

const ChessSquare: React.FC<ChessSquareProps> = ({ color, piece, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.square,
          color === 'white' ? styles.lightSquare : styles.darkSquare,
        ]}
      >
        {piece && piece.type === 'pawn' && (
          <Image
            source={
              piece.color === 'white'
                ? require('../../assets/pieces/white_pawn.png')
                : require('../../assets/pieces/black_pawn.png')
            }
            style={{ width: 50, height: 50 }}
          />
        )}
        {piece && piece.type === 'rook' && (
          <Image
            source={
              piece.color === 'white'
                ? require('../../assets/pieces/white_rook.png')
                : require('../../assets/pieces/black_rook.png')
            }
            style={{ width: 50, height: 50 }}
          />
        )}
        {piece && piece.type === 'knight' && (
          <Image
            source={
              piece.color === 'white'
                ? require('../../assets/pieces/white_knight.png')
                : require('../../assets/pieces/black_knight.png')
            }
            style={{ width: 50, height: 50 }}
          />
        )}
        {piece && piece.type === 'bishop' && (
          <Image
            source={
              piece.color === 'white'
                ? require('../../assets/pieces/white_bishop.png')
                : require('../../assets/pieces/black_bishop.png')
            }
            style={{ width: 50, height: 50 }}
          />
        )}
        {piece && piece.type === 'queen' && (
          <Image
            source={
              piece.color === 'white'
                ? require('../../assets/pieces/white_queen.png')
                : require('../../assets/pieces/black_queen.png')
            }
            style={{ width: 50, height: 50 }}
          />
        )}
        {piece && piece.type === 'king' && (
          <Image
            source={
              piece.color === 'white'
                ? require('../../assets/pieces/white_king.png')
                : require('../../assets/pieces/black_king.png')
            }
            style={{ width: 50, height: 50 }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: { width: 50, height: 50 },
  lightSquare: { backgroundColor: '#CCCCCC' },
  darkSquare: { backgroundColor: '#039300' },
});

export default ChessSquare;
