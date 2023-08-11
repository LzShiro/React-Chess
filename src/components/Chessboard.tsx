import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ChessSquare from './ChessSquare';
import {
  ChessboardData,
  ChessSquare as SquareType,
  ChessPiece,
  PieceType,
} from '../types/ChessboardData';

interface ChessboardProps {
  data: ChessboardData;
  timerDuration:  number;
}
interface Position {
  row: number;
  col: number;
}

enum PlayerColor {
  White = 'white',
  Black = 'black',
}

const isValidPosition = (position: Position): boolean => {
  const { row, col } = position;
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

const getValidPawnMoves = (
  selectedPiece: ChessPiece,
  position: Position,
  boardData: ChessboardData
) => {
  const validMoves: Position[] = [];

  const { row, col } = position;
  const colorMultiplier = selectedPiece.color === 'white' ? -1 : 1;

  // Movimiento básico de avance del peón
  const forwardMove: Position = {
    row: row + 1 * colorMultiplier,
    col,
  };

  // Verificar si el movimiento de avance está dentro del tablero y si la casilla está vacía
  if (
    isValidPosition(forwardMove) &&
    !boardData.squares[forwardMove.row][forwardMove.col].piece
  ) {
    validMoves.push(forwardMove);
    // Movimiento de avance doble del peón (solo si está en su posición inicial)
    const doubleForwardMove: Position = {
      row: row + 2 * colorMultiplier,
      col,
    };
    if (
      (selectedPiece.color === 'white' && row === 6 ) ||
      (selectedPiece.color === 'black' && row === 1 )
    ) {
      if (
        isValidPosition(doubleForwardMove) &&
        !boardData.squares[doubleForwardMove.row][doubleForwardMove.col].piece
      ) {
        validMoves.push(doubleForwardMove);
      }
    }
  }
  // Movimiento de captura diagonal izquierda del peón
  const captureLeftMove: Position = {
    row: row + 1 * colorMultiplier,
    col: col - 1,
  };

  // Verificar si el movimiento de captura izquierda está dentro del tablero y si hay una pieza del oponente
  if (
    isValidPosition(captureLeftMove) &&
    boardData.squares[captureLeftMove.row][captureLeftMove.col].piece &&
    boardData.squares[captureLeftMove.row][captureLeftMove.col].piece?.color !==
      selectedPiece.color
  ) {
    validMoves.push(captureLeftMove);
  }

  // Movimiento de captura diagonal derecha del peón
  const captureRightMove: Position = {
    row: row + 1 * colorMultiplier,
    col: col + 1,
  };

  // Verificar si el movimiento de captura derecha está dentro del tablero y si hay una pieza del oponente
  if (
    isValidPosition(captureRightMove) &&
    boardData.squares[captureRightMove.row][captureRightMove.col].piece &&
    boardData.squares[captureRightMove.row][captureRightMove.col].piece
      ?.color !== selectedPiece.color
  ) {
    validMoves.push(captureRightMove);
  }
  // Agregar siempre los movimientos válidos del peón, incluso si no hay movimientos posibles
  console.log(`Clic en la casilla ${row} row, ${col} col`);
  console.log('Movimientos válidos: ', validMoves);
  return validMoves;
};




const Chessboard: React.FC<ChessboardProps & { timerDuration: number }> = ({ data, timerDuration }) => {
  const [boardData, setBoardData] = useState(data);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [selectedPiecePosition, setSelectedPiecePosition] = useState<Position | null>(null);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [time, setTime] = useState(timerDuration)

  // Actualizar el estado de boardData cuando data cambie
  useEffect(() => {
    //Crear una nueva copia de data
    const newBoardData = {...data};
    //Actualizar el estado con la nueva copia de data
    setBoardData(newBoardData);
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [data, time]);

  const handlePieceMove = (piecePosition: Position) => {
    const selectedPiece =
      boardData.squares[piecePosition.row][piecePosition.col].piece;

    // Verificar si la pieza puede moverse a la posición de destino
    if (selectedPiece) {
      switch (selectedPiece.type) {
        case PieceType.Pawn:
          // Llamar a la función para obtener los movimientos válidos para el peón
          const moves = getValidPawnMoves(selectedPiece, piecePosition, boardData);
          console.log('Movimientos válidos: ', moves);
          setValidMoves(moves);
          setSelectedPiecePosition(piecePosition);
          break;
        case PieceType.Rook:
          // Llamar a la función para obtener los movimientos válidos para la torre
          // Implementar la función getValidRookMoves
          // ...
          break;
        // Agregar otros casos para los demás tipos de piezas
        default:
          break;
      }
    }
  };
  const handleMovePiece = (destination: Position) => {
    //Verificar si la posicion de destino está en los movimientos válidos
    const isValidMove = validMoves.some((move) => move.row === destination.row && move.col === destination.col);
    if (isValidMove && selectedPiecePosition){
      const newBoardData = {...boardData};
      const {row, col} = selectedPiecePosition;
      const pieceToMove = newBoardData.squares[row][col].piece;
      // Actualizar la posición de la pieza en el tablero
      newBoardData.squares[row][col].piece = undefined;
      newBoardData.squares[destination.row][destination.col].piece = pieceToMove;

      setBoardData(newBoardData);
      setValidMoves([]);
      setSelectedPiecePosition(null);
    }
  };

  return (
    <View>
      <Text style={styles.timer}>{time}</Text>
      {data.squares.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((square: SquareType, colIndex: number) => {
            const { piece } = square;
            const position: Position = { row: rowIndex, col: colIndex };
            const isMoveValid = validMoves.some(
              (move) => move.row === rowIndex && move.col === colIndex
            );

            return (
              <ChessSquare
                key={colIndex}
                color={square.color}
                piece={piece}
                isValidMove={isMoveValid}
                onPress={() => {if (selectedPiecePosition){handleMovePiece(position);
                } else {
                  handlePieceMove(position);
                }
              }}
              />
            );
          })}
        </View>  
      ))}
      <Text style={styles.timer}>{time}</Text>

    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  timer: {
    color: 'black',
    fontSize: 32,
    marginBottom: 10,
  },
});

export default Chessboard;
