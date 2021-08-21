import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {font} from '../ui-kit';

const Card = ({
  cardId,
  cardValue,
  isVisible,
  isDisabled,
  onPress,
  isMatched,
}) => {
  return (
    <Pressable
      onPress={() => onPress(cardId, cardValue)}
      disabled={isDisabled}
      style={[styles.cardContainer, {opacity: isMatched ? 0 : 1}]}>
      {isVisible ? <Text style={styles.cardContent}>{cardValue}</Text> : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 100,
    flex: 0.25,
    backgroundColor: '#5bc388',
    marginHorizontal: 4,
    marginVertical: 4,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    fontSize: 40,
    fontFamily: font.primary700,
  },
});

export default Card;
