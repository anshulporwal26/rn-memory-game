// de-facto unbiased shuffle algorithm - Fisher-Yates (aka Knuth) Shuffle
// Reference: https://stackoverflow.com/a/2450976/5891099
export const shuffle = array => {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const duplicateArrayItems = (array, times) => {
  return array.reduce((res, current) => {
    return res.concat(Array(times).fill(current));
  }, []);
};
