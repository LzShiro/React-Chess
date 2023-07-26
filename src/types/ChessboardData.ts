export interface ChessboardData {
  rows: number;
  cols: number;
  squares: ChessSquare[][];
}

export interface ChessSquare {
  color: 'white' | 'black';
  piece?: ChessPiece;
}

export interface ChessPiece {
  type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
  color: 'white' | 'black';
}