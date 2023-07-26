import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import GameProps from '../types/GameProps';
import { useNavigation } from '@react-navigation/native';
import Chessboard from '../components/Chessboard';
import {
  ChessboardData,
  ChessPiece,
  ChessSquare,
} from '../types/ChessboardData';

const Game = (props: { route: { params: { timerDuration: number } } }) => {
  const navigation = useNavigation();
  const timerDuration = props.route.params.timerDuration;
  const [time, setTime] = useState(timerDuration);
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
              type: 'pawn',
              color: 'black',
            };
            break;
          case 6:
            piece = {
              type: 'pawn',
              color: 'white',
            };
            break;
          case 0:
            switch (col) {
              case 0:
              case 7:
                piece = {
                  type: 'rook',
                  color: 'black',
                };
                break;
              case 1:
              case 6:
                piece = {
                  type: 'knight',
                  color: 'black',
                };
                break;
              case 2:
              case 5:
                piece = {
                  type: 'bishop',
                  color: 'black',
                };
                break;
              case 3:
                piece = {
                  type: 'queen',
                  color: 'black',
                };
                break;
              case 4:
                piece = {
                  type: 'king',
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
                  type: 'rook',
                  color: 'white',
                };
                break;
              case 1:
              case 6:
                piece = {
                  type: 'knight',
                  color: 'white',
                };
                break;
              case 2:
              case 5:
                piece = {
                  type: 'bishop',
                  color: 'white',
                };
                break;
              case 3:
                piece = {
                  type: 'queen',
                  color: 'white',
                };
                break;
              case 4:
                piece = {
                  type: 'king',
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
  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => {
          navigation.navigate('Stats' as never);
        }}
      >
        <Text style={styles.prueba}>Go back to Stats</Text>
      </TouchableOpacity>
      <Text style={styles.prueba}>{time}</Text>
      <Chessboard data={boardData} />
      <Text style={styles.prueba}>{time}</Text>
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
