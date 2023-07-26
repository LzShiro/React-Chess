import { ChessPiece } from '../types/ChessboardData';
import { getValidPawnMoves, PieceType } from './Chessboard';

// Prueba para verificar los movimientos válidos del peón
test('Test getValidPawnMoves', () => {
  const pawnPiece: ChessPiece = {
    type: PieceType.Pawn,
    color: 'white',
  };
  const piecePosition = {
    row: 1,
    col: 3,
  };

  // Llama a la función getValidPawnMoves con los argumentos apropiados
  const validMoves = getValidPawnMoves(pawnPiece, piecePosition);

  // Aquí puedes realizar las aserciones (assertions) para verificar si los movimientos válidos son los esperados
  // Por ejemplo, puedes imprimirlos por consola o compararlos con un array esperado
  console.log(validMoves);
  const expectedMove = { row: 2, col: 3 };
  expect(validMoves).toContainEqual(expectedMove);
});
