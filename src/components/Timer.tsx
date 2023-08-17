import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  blackTimeAtom,
  whiteTimeAtom,
  turnAtom,
  PlayerColor,
} from './gameState';
import { Text, View, StyleSheet } from 'react-native';
import { TimerProps } from '../types/ChessboardData';

const Timer: React.FC<TimerProps> = ({ onTimeEnd }) => {
  const [blackTime, setBlackTime] = useAtom(blackTimeAtom);
  const [whiteTime, setWhiteTime] = useAtom(whiteTimeAtom);
  const turn = useAtom(turnAtom);

  useEffect(() => {
    const blackInterval = setInterval(() => {
      if (!turn) {
        setBlackTime((prevTime) => prevTime - 1);
      }
    }, 1000);
    return () => clearInterval(blackInterval);
  }, [turn]);

  useEffect(() => {
    const whiteInterval = setInterval(() => {
      if (turn) {
        setWhiteTime((prevTime) => prevTime - 1);
      }
    }, 1000);
    return () => clearInterval(whiteInterval);
  }, [whiteTime]);

  return (
    <View>
      <Text style={styles.timer}>{`${turn ? 'White' : 'Black'} Timer: ${
        turn ? whiteTime : blackTime
      }`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    color: 'black',
    fontSize: 32,
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default Timer;
