import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Chessboard from '../components/Chessboard';
import {
  ChessboardData,
  ChessPiece,
  ChessSquare,
  PieceType,
} from '../types/ChessboardData';

const Game: React.FC = () => {
  const navigation = useNavigation();
  const generateInitialBoardData = (): ChessboardData => {
    //column = letters
    //row = numbers
    const initialSquares: ChessSquare[][] = [];
    for (let row = 0; row < 8; row++) {
      const rowSquares: ChessSquare[] = [];
      for (let col = 0; col < 8; col++) {
        const color = (row + col) % 2 === 0 ? 'white' : 'black';
        let piece: ChessPiece | undefined;

        switch (row) {
          case 1:
            piece = {
              type: PieceType.Pawn,
              color: 'black',
            };
            break;
          case 6:
            piece = {
              type: PieceType.Pawn,
              color: 'white',
            };
            break;
          case 0:
            switch (col) {
              case 0:
              case 7:
                piece = {
                  type: PieceType.Rook,
                  color: 'black',
                };
                break;
              case 1:
              case 6:
                piece = {
                  type: PieceType.Knight,
                  color: 'black',
                };
                break;
              case 2:
              case 5:
                piece = {
                  type: PieceType.Bishop,
                  color: 'black',
                };
                break;
              case 3:
                piece = {
                  type: PieceType.Queen,
                  color: 'black',
                };
                break;
              case 4:
                piece = {
                  type: PieceType.King,
                  color: 'black',
                };
                break;
              default:
                break;
            }
            break;
          case 7:
            switch (col) {
              case 0:
              case 7:
                piece = {
                  type: PieceType.Rook,
                  color: 'white',
                };
                break;
              case 1:
              case 6:
                piece = {
                  type: PieceType.Knight,
                  color: 'white',
                };
                break;
              case 2:
              case 5:
                piece = {
                  type: PieceType.Bishop,
                  color: 'white',
                };
                break;
              case 3:
                piece = {
                  type: PieceType.Queen,
                  color: 'white',
                };
                break;
              case 4:
                piece = {
                  type: PieceType.King,
                  color: 'white',
                };
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
        rowSquares.push({
          color,
          piece,
        });
      }
      initialSquares.push(rowSquares);
    }

    return {
      rows: 8,
      cols: 8,
      squares: initialSquares,
    };
  };
  const boardData: ChessboardData = generateInitialBoardData();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => {
          navigation.navigate('Stats' as never);
        }}>
        <Text style={styles.prueba}>Go back to Stats</Text>
      </TouchableOpacity>
      <Chessboard data={boardData} />
    </View>
  );
};

const styles = StyleSheet.create({
  prueba: {
    color: 'black',
    fontSize: 32,
    marginBottom: 10,
  },
  signUpButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
    marginBottom: 15,
    borderColor: 'black',
    borderWidth: 2,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Game;
