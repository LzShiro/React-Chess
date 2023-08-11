import React from 'react';
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import { ChessPiece } from '../types/ChessboardData';
interface ChessSquareProps {
  color: 'white' | 'black';
  piece?: ChessPiece;
  onPress?: () => void;
  isValidMove?: boolean;
}

const ChessSquare: React.FC<ChessSquareProps> = ({
  color,
  piece,
  onPress,
  isValidMove,
}) => {
  return (
    <TouchableHighlight style={[
      styles.square,
      color === 'white' ? styles.lightSquare : styles.darkSquare,
    ]}
    underlayColor="yellow"
    onPress={onPress}
  >
      <View style={styles.squareContent}>
        {isValidMove && <View style={styles.validMoveIndicator} />}
      
        {piece && piece.type === 'pawn' && (
          <Image
            source={
              piece.color === 'white'
                ? require('../../assets/pieces/white_pawn.png')
                : require('../../assets/pieces/black_pawn.png')
            }
            style={styles.pieceImage}
          />
        )}
        {piece && piece.type === 'rook' && (
          <Image
            source={
              piece.color === 'white'
                ? require('../../assets/pieces/white_rook.png')
                : require('../../assets/pieces/black_rook.png')
            }
            style={styles.pieceImage}
          />
        )}
        {piece && piece.type === 'knight' && (
          <Image
            source={
              piece.color === 'white'
                ? require('../../assets/pieces/white_knight.png')
                : require('../../assets/pieces/black_knight.png')
            }
            style={styles.pieceImage}
          />
        )}
        {piece && piece.type === 'bishop' && (
          <Image
            source={
              piece.color === 'white'
                ? require('../../assets/pieces/white_bishop.png')
                : require('../../assets/pieces/black_bishop.png')
            }
            style={styles.pieceImage}
          />
        )}
        {piece && piece.type === 'queen' && (
          <Image
            source={
              piece.color === 'white'
                ? require('../../assets/pieces/white_queen.png')
                : require('../../assets/pieces/black_queen.png')
            }
            style={styles.pieceImage}
          />
        )}
        {piece && piece.type === 'king' && (
          <Image
            source={
              piece.color === 'white'
                ? require('../../assets/pieces/white_king.png')
                : require('../../assets/pieces/black_king.png')
            }
            style={styles.pieceImage}
          />
        )}
        </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  square: { width: 50, height: 50 },
  lightSquare: { backgroundColor: '#CCCCCC' },
  darkSquare: { backgroundColor: '#039300' },
  squareContent: {position: 'relative'},
  validMoveIndicator:{
    position: 'absolute',
    top: 25,
    left: 25,
    backgroundColor: '#5A5A5A',
    width: 10,
    height: 10,
    borderRadius: 5,
    transform: [{translateX: -5},{translateY: -5}],
    zIndex: 1,
  },
  pieceImage: {
    width: '100%',
    height: '100%',
  }
});

export default ChessSquare;
