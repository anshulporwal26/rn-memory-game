import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {v4 as uuidv4} from 'uuid';

import {duplicateArrayItems, shuffle} from '../utils';
import {CARD_LETTERS} from '../constants';
import Card from '../components/Card';
import {font, colors} from '../ui-kit';

const INITIAL_CARDS = duplicateArrayItems(CARD_LETTERS, 2).map(item => ({
  id: uuidv4(),
  value: item,
  isVisible: false,
}));

const GameScreen = () => {
  const [cards, setCards] = useState(shuffle(INITIAL_CARDS));
  const [cardsMatched, setCardsMatched] = useState([]);
  const [prevTurn, setPrevTurn] = useState(null);
  const [currTurn, setCurrTurn] = useState(null);
  const [turns, setTurns] = useState(0);

  const isGameOver = cardsMatched.length === CARD_LETTERS.length;

  useEffect(() => {
    if (prevTurn && currTurn) {
      if (prevTurn === currTurn) {
        const updatedCardsMatched = [...cardsMatched, currTurn];
        setCardsMatched(updatedCardsMatched);
        setCurrTurn(null);
        setPrevTurn(null);
        setTurns(prevTurns => prevTurns + 1);
      } else {
        setTurns(prevTurns => prevTurns + 1);
        const updatedCards = cards.map(card =>
          card.isVisible ? {...card, isVisible: false} : card,
        );
        setTimeout(() => {
          setCurrTurn(null);
          setPrevTurn(null);
          setCards(updatedCards);
        }, 500);
      }
    }
  }, [prevTurn, currTurn]);

  const toggleView = useCallback(
    (cardId, cardValue) => {
      const updatedCards = cards.map(card =>
        card.id === cardId ? {...card, isVisible: !card.isVisible} : card,
      );
      if (!prevTurn) {
        setPrevTurn(cardValue);
      } else {
        setCurrTurn(cardValue);
      }
      setCards(updatedCards);
    },
    [cards, prevTurn],
  );

  const renderItem = ({item}) => {
    const isMatched = cardsMatched.includes(item.value);
    const isDisabled = (prevTurn && currTurn) || item.isVisible || isMatched;
    return (
      <Card
        key={item.id}
        cardId={item.id}
        cardValue={item.value}
        isVisible={item.isVisible}
        isDisabled={isDisabled}
        onPress={toggleView}
        isMatched={isMatched}
      />
    );
  };

  const spawnNewGame = () => {
    setCards(shuffle(INITIAL_CARDS));
    setCardsMatched([]);
    setPrevTurn(null);
    setCurrTurn(null);
    setTurns(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading1}>leap.club</Text>
      <Text style={styles.subHeading1}>Turns: {turns}</Text>
      <Text style={styles.subHeading1}>Matches: {cardsMatched.length}</Text>

      {isGameOver ? (
        <View style={styles.gameOverContainer}>
          <Image
            source={require('../assets/images/cracker.png')}
            style={styles.gameOverImage}
          />
          <Text style={styles.heading2}>Congratulations!</Text>
          <Text style={styles.subHeading1}>
            You completed the game in {turns} turns
          </Text>
          <Pressable
            style={[styles.btn, styles.primaryBtn]}
            onPress={spawnNewGame}>
            <Text style={[styles.btnText, styles.primaryBtnText]}>
              Play again
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          <FlatList
            data={cards}
            numColumns={4}
            contentContainerStyle={styles.gameContainer}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
          />
          <View style={styles.center}>
            <Pressable
              style={[styles.btn, styles.outlineBtn]}
              onPress={spawnNewGame}>
              <Text style={[styles.btnText, styles.outlineBtnText]}>
                Restart
              </Text>
            </Pressable>
          </View>
        </>
      )}

      <Text style={styles.footerText}>Made with ❤️ & 🧠 by Anshul</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
  },
  heading1: {
    fontFamily: font.primary700,
    fontSize: 24,
    textAlign: 'center',
  },
  heading2: {
    fontFamily: font.primary700,
    fontSize: 20,
    textAlign: 'center',
  },
  subHeading1: {
    fontFamily: font.primary400,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  },
  gameContainer: {
    padding: 8,
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverImage: {height: 80, width: 80, marginBottom: 16},
  footerContainer: {
    paddingVertical: 4,
  },
  footerText: {
    fontFamily: font.primary400,
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 8,
  },
  btn: {
    flexDirection: 'row',
    minWidth: 180,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: {
    fontFamily: font.primary500,
    fontSize: 16,
  },
  primaryBtn: {
    backgroundColor: colors.black,
    marginTop: 16,
  },
  primaryBtnText: {
    color: colors.white,
    fontFamily: font.primary400,
    fontSize: 16,
  },
  outlineBtn: {
    backgroundColor: colors.white,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.black,
    marginBottom: 12,
  },
  outlineBtnText: {
    color: colors.black,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default GameScreen;
