import { atom } from 'jotai';

export enum PlayerColor {
  White = 'white',
  Black = 'black',
}

export const whiteTimeAtom = atom(300);
export const blackTimeAtom = atom(300);

export const turnAtom = atom<PlayerColor>(PlayerColor.White);
