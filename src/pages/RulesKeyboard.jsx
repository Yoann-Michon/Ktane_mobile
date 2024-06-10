import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";

const firstColumn = [
  { name: "archaic koppa" },
  { name: "cyrillic yus" },
  { name: "stroke lambda" },
  { name: "greek koppa" },
  { name: "iotified yus" },
  { name: "greek kai" },
  { name: "anti-sigma" },
];

const secondColumn = [
  { name: "cyrillic E" },
  { name: "archaic koppa" },
  { name: "anti-sigma" },
  { name: "cyrillic O-hook" },
  { name: "white star" },
  { name: "greek kai" },
  { name: "question mark" },
];

const merge = [...firstColumn, ...secondColumn];
const allSymbol = merge.filter((item, index) => {
  const currentName = item.name;
  return index === merge.findIndex((obj) => obj.name === currentName);
});

const windowWidth = Dimensions.get("window").width;

const symbolImages = {
  "archaic koppa": require("./../../assets/ktane/symbols/archaic_koppa.jpeg"),
  "cyrillic yus": require("./../../assets/ktane/symbols/cyrillic_yus.jpeg"),
  "stroke lambda": require("./../../assets/ktane/symbols/stroke_lambda.jpeg"),
  "iotified yus": require("./../../assets/ktane/symbols/iotified_yus.jpeg"),
  "greek kai": require("./../../assets/ktane/symbols/greek_kai.jpeg"),
  "anti-sigma": require("./../../assets/ktane/symbols/anti_sigma.jpeg"),
  "cyrillic E": require("./../../assets/ktane/symbols/cyrillic_E.jpeg"),
  "cyrillic O-hook": require("./../../assets/ktane/symbols/cyrillic_O_hook.jpeg"),
  "white star": require("./../../assets/ktane/symbols/white_star.jpeg"),
  "greek koppa": require("./../../assets/ktane/symbols/greek_koppa.jpeg"),
  "question mark": require("./../../assets/ktane/symbols/question_mark.jpeg"),
};

const RulesKeyboard = () => {
  const [result, setResultValue] = useState([]);
  const [toggleAnswer, setToggleAnswer] = useState(false);
  const [sortedSymbols, setSortedSymbols] = useState([]);

  const changeValue = (selectedSymbol) => {
    if (result.length < 4) {
      setResultValue([...result, selectedSymbol]);
    }
  };

  const reset = () => {
    setResultValue([]);
    setSortedSymbols([]);
  };

  const solve = () => {
    const tab = [];
    for (let sym of result) {
      for (let symbol of firstColumn) {
        if (sym === symbol.name) {
          tab.push(symbol);
        }
      }
    }
    if (tab.length !== 4) {
        tab.length=0;
      for (let sym of result) {
        for (let symbol of secondColumn) {
          if (sym === symbol.name) {
            tab.push(symbol);
          }
        }
      }
      tab.sort((a, b) => secondColumn.indexOf(a) - secondColumn.indexOf(b));
    } else {
      tab.sort((a, b) => firstColumn.indexOf(a) - firstColumn.indexOf(b));
    }

    console.log(tab);
    setSortedSymbols(tab);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          Cliquer sur les 4 symboles présents sur le clavier.
        </Text>
      </View>
      <View style={styles.imageContainer}>
        {allSymbol.map((symbol, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => changeValue(symbol.name)}
            style={{
              borderWidth: 2,
              borderColor: result.includes(symbol.name) ? "green" : "black",
              margin: 10,
            }}
          >
            <Image source={symbolImages[symbol.name]} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        <Button title="Annuler" onPress={() => reset()} />
        <View style={{ width: 10 }} />
        <Button title="Valider" onPress={() => solve()} />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent:"space-around",
          textAlign: "center",
          height:150
        }}
      >
        <Text>Solution:</Text>
        {sortedSymbols.length > 0 && (
          <View style={styles.imageContainer}>
            {sortedSymbols.map((symbol, index) => (
              <Image
                key={index}
                source={symbolImages[symbol.name]}
                style={styles.image}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: windowWidth,
  },
  text: {
    textAlign: "center",
    marginBottom: 30,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: windowWidth,
  },
});

export default RulesKeyboard;
