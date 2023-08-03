import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ChessSquare from './ChessSquare';
import {
  ChessboardData,
  ChessSquare as SquareType,
  ChessPiece,
  PieceType,
} from '../types/ChessboardData';

interface ChessboardProps {
  data: ChessboardData;
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
  const colorMultiplier = selectedPiece.color === 'white' ? 1 : -1;

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
      (selectedPiece.color === 'white' &&
        row === 1 &&
        !boardData.squares[doubleForwardMove.row][doubleForwardMove.col]
          .piece) ||
      (selectedPiece.color === 'black' &&
        row === 6 &&
        !boardData.squares[doubleForwardMove.row][doubleForwardMove.col].piece)
    ) {
      validMoves.push(doubleForwardMove);
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
  console.log(`Clic en la casilla ${row}, ${col}`);
  console.log('Movimientos válidos: ', validMoves);
  return validMoves;
};

const Chessboard: React.FC<ChessboardProps> = ({ data }) => {
  const [boardData, setBoardData] = useState(data);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [hasValidMove, setHasValidMove] = useState(false);

  // Actualizar el estado de boardData cuando data cambie
  useEffect(() => {
    setBoardData(data);
  }, [data]);

  const handleSquarePress = (row: number, col: number) => {
    const piece = boardData.squares[row][col].piece;
    if (piece) {
      handlePieceMove({ row, col });
    } else {
      console.log('La casilla no tiene pieza.');
      setValidMoves([]);
      setHasValidMove(false);
    }
  };
  const handlePieceMove = (piecePosition: Position) => {
    const selectedPiece =
      boardData.squares[piecePosition.row][piecePosition.col].piece;

    // Verificar si la pieza puede moverse a la posición de destino
    if (selectedPiece) {
      switch (selectedPiece.type) {
        case PieceType.Pawn:
          // Llamar a la función para obtener los movimientos válidos para el peón
          const moves = getValidPawnMoves(
            selectedPiece,
            piecePosition,
            boardData
          );
          console.log('Movimientos válidos: ', moves);
          setValidMoves(moves);
          setHasValidMove(true);
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

  return (
    <View>
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
                onPress={() => handleSquarePress(rowIndex, colIndex)}
              />
            );
          })}
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
