import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ChessSquare from './ChessSquare';
import {
  ChessboardData,
  ChessSquare as SquareType,
} from '../types/ChessboardData';

interface ChessboardProps {
  data: ChessboardData;
}
interface Position {
  row: number;
  col: number;
}

export enum PieceType {
  Pawn = 'pawn',
  Rook = 'rook',
  Knight = 'knight',
  Bishop = 'bishop',
  Queen = 'queen',
  King = 'king',
}

enum PlayerColor {
  White = 'white',
  Black = 'black',
}

interface ChessPiece {
  type: PieceType;
  color: PlayerColor;
}

const isValidPosition = (position: Position): boolean => {
  const { row, col } = position;
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

export const getValidPawnMoves = (
  selectedPiece: ChessPiece,
  position: Position
) => {
  const validMoves: Position[] = [];

  const { row, col } = position;
  const colorMultiplier = selectedPiece.color === 'white' ? 1 : -1;

  // Movimiento básico de avance del peón
  const forwardMove: Position = {
    row: row + 1 * colorMultiplier,
    col,
  };

  // Verificar si el movimiento de avance está dentro del tablero y si la casilla está vacía
  if (isValidPosition(forwardMove)) {
    validMoves.push(forwardMove);
  }

  // Movimiento de captura diagonal izquierda del peón
  const captureLeftMove: Position = {
    row: row + 1 * colorMultiplier,
    col: col - 1,
  };

  // Verificar si el movimiento de captura izquierda está dentro del tablero
  if (isValidPosition(captureLeftMove)) {
    validMoves.push(captureLeftMove);
  }

  // Movimiento de captura diagonal derecha del peón
  const captureRightMove: Position = {
    row: row + 1 * colorMultiplier,
    col: col + 1,
  };

  // Verificar si el movimiento de captura derecha está dentro del tablero
  if (isValidPosition(captureRightMove)) {
    validMoves.push(captureRightMove);
  }
  console.log(`Clic en la casilla ${row}, ${col}`);
  return validMoves;
};

const Chessboard: React.FC<ChessboardProps> = ({ data }) => {
  const handleSquarePress = (row: number, col: number) => {
    console.log(`Clic en la casilla ${row}, ${col}`);
  };
  const handlePieceMove = (
    piecePosition: Position,
    targetPosition: Position
  ) => {
    const [boardData, setBoardData] = useState(data);
    const selectedPiece =
      boardData.squares[piecePosition.row][piecePosition.col].piece;

    // Verificar si la pieza puede moverse a la posición de destino
    if (selectedPiece) {
      let isValidMove = false;
      switch (selectedPiece.type) {
        case PieceType.Pawn:
          // Llamar a la función para obtener los movimientos válidos para el peón
          const validPawnMoves = getValidPawnMoves(
            selectedPiece as ChessPiece & { type: PieceType },
            piecePosition
          );
          // Verificar si la posición de destino está en los movimientos válidos del peón
          isValidMove = validPawnMoves.some(
            (move) =>
              move.row === targetPosition.row && move.col === targetPosition.col
          );
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

      // Si el movimiento es válido, actualizar el estado del tablero con la nueva posición de la pieza
      if (isValidMove) {
        const updatedSquares = [...boardData.squares];
        updatedSquares[piecePosition.row][piecePosition.col].piece = undefined;
        updatedSquares[targetPosition.row][targetPosition.col].piece =
          selectedPiece;
        setBoardData({ ...boardData, squares: updatedSquares });
      }
    }
  };

  return (
    <View>
      {data.squares.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((square: SquareType, colIndex: number) => (
            <ChessSquare
              key={colIndex}
              color={square.color}
              piece={square.piece}
              onPress={() => handleSquarePress(rowIndex, colIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default Chessboard;
