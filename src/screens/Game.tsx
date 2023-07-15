import { useNavigation } from '@react-navigation/native';
import { DataType } from '../types/matches';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';

const getResultData = (outcome: string) => {
  let resultImage;
  let resultText;

  if (outcome === 'win') {
    resultImage = require('../../assets/Checkmark.png');
    resultText = 'Win';
  } else if (outcome === 'lose') {
    resultImage = require('../../assets/lose.png');
    resultText = 'Lose';
  } else {
    resultImage = require('../../assets/draw.png');
    resultText = 'Draw';
  }

  return { resultImage, resultText };
};

const Game: React.FC = () => {
  const data: DataType[] = [
    {
      id: 1,
      image: require('../../assets/Pawn.png'),
      title: 'Game 1',
      outcome: 'win',
    },
    {
      id: 2,
      image: require('../../assets/Pawn.png'),
      title: 'Game 2',
      outcome: 'draw',
    },
    {
      id: 3,
      image: require('../../assets/Pawn.png'),
      title: 'Game 3',
      outcome: 'lose',
    },
    {
      id: 4,
      image: require('../../assets/Pawn.png'),
      title: 'Game 4',
      outcome: 'win',
    },
    {
      id: 5,
      image: require('../../assets/Pawn.png'),
      title: 'Game 5',
      outcome: 'lose',
    },
    {
      id: 6,
      image: require('../../assets/Pawn.png'),
      title: 'Game 6',
      outcome: 'win',
    },
  ];
  const navigation = useNavigation();
  const renderItem = ({ item }: { item: DataType }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.outcome}</Text>
      </View>
      <Image
        source={getResultData(item.outcome).resultImage}
        style={styles.winOrLoseItemImage}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.topContentContainer}>
        <Image
          source={require('../../assets/Pawn.png')}
          style={[styles.pawnImage, styles.shadow]}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.mainText, styles.shadow]}>Name</Text>
          <Text style={styles.emailText}>example@example.com</Text>
        </View>
      </View>
      <View style={styles.gameModesView}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.gameModesContainer}
        >
          <TouchableOpacity style={styles.gameModesItem}>
            <Text style={[styles.gamesModeItemText, styles.shadow]}>Rapid</Text>
            <Image
              source={require('../../assets/Timer.png')}
              style={[styles.gamesModeItemImage, styles.shadow]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.gameModesItem}>
            <Text style={[styles.gamesModeItemText, styles.shadow]}>Blitz</Text>
            <Image
              source={require('../../assets/Blitz.png')}
              style={[styles.gamesModeItemImage, styles.shadow]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.gameModesItem}>
            <Text style={[styles.gamesModeItemText, styles.shadow]}>
              Bullet
            </Text>
            <Image
              source={require('../../assets/Bullet.png')}
              style={[styles.gamesModeItemImage, styles.shadow]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.gameModesItem}>
            <Text style={[styles.gamesModeItemText, styles.shadow]}>
              Computer
            </Text>
            <Image
              source={require('../../assets/computer.png')}
              style={[styles.gamesModeItemImage, styles.shadow]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.gameModesItem}>
            <Text style={[styles.gamesModeItemText, styles.shadow]}>
              Friend
            </Text>
            <Image
              source={require('../../assets/Friend.png')}
              style={[styles.gamesModeItemImage, styles.shadow]}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View>
        <Text style={[styles.gamesText, styles.shadow]}>Partidas</Text>
        <View style={styles.flatListView}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            maxToRenderPerBatch={6}
            initialNumToRender={6}
            windowSize={6}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pawnImage: {
    width: 128,
    height: 128,
    marginTop: 30,
    marginBottom: 30,
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  topContentContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
  },
  textContainer: {
    marginLeft: 10,
    marginTop: 20,
  },
  mainText: {
    fontFamily: 'Arial',
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 20,
  },
  emailText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  gameModesView: {
    height: '18%',
    marginTop: 20,
    backgroundColor: '#D9D9D9',
  },
  gameModesContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  gameModesItem: {
    width: 99,
    height: 90,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#838282',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gamesModeItemText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  gamesModeItemImage: {
    flex: 1,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  gamesText: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  flatListView: {
    height: '55%',
    marginTop: 10,
    backgroundColor: '#D9D9D9',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  itemImage: {
    width: 43,
    height: 43,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
  },
  winOrLoseItemImage: {
    width: 34,
    height: 34,
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: 'gray',
  },
  itemRightText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Game;
