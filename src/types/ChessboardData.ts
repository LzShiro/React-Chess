import { PlayerColor } from "../components/gameState";

export interface ChessboardData {
  rows: number;
  cols: number;
  squares: ChessSquare[][];
}

export interface ChessSquare {
  color: 'white' | 'black';
  piece?: ChessPiece;
}


export enum PieceType {
  Pawn = 'pawn',
  Rook = 'rook',
  Knight = 'knight',
  Bishop = 'bishop',
  Queen = 'queen',
  King = 'king',
}
export interface ChessPiece {
  type: PieceType;
  color: 'white' | 'black';
}
export interface TimerProps {
  onTimeEnd: () => void;
}

export interface TimerState {
  whiteTime: number;
  blackTime: number;
}