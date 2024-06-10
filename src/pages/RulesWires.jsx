import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

const nbWires = [3, 4, 5, 6];
const colors = ["blue", "red", "black", "yellow", "white"];

const evenOrOdd = (number) => {
  console.log(number);
  if (number % 2 === 0) {
    return "even";
  }
  return "odd";
};

const CutWires = ({ nbr, colorValues, textInput }) => {
  const blueCount = colorValues.filter((color) => color === "blue").length;
  const redCount = colorValues.filter((color) => color === "red").length;
  const yellowCount = colorValues.filter((color) => color === "yellow").length;
  const whiteCount = colorValues.filter((color) => color === "white").length;
  const blackCount = colorValues.filter((color) => color === "black").length;

  let message = "";
  console.log(nbr);
  if (nbr === 3) {
    if (redCount === 0) {
      message = "Coupez le 2ème fil";
    } else if (blueCount > 1) {
      message = "Coupez le dernier fil bleu";
    } else {
      message = "Coupez le dernier fil";
    }
  }

  if (nbr === 4) {
    if (redCount > 1 && evenOrOdd(parseInt(textInput)) === "odd") {
      message = "Coupez le dernier fil rouge";
    } else if (
      (redCount === 0 && colorValues[colorValues.length - 1] === "yellow") ||
      blueCount === 1
    ) {
      message = "Coupez le 1er fil";
    } else if (yellowCount > 1) {
      message = "Coupez le dernier fil";
    } else {
      message = "Coupez le 2ème fil";
    }
  }

  if (nbr === 5) {
    if (
      colorValues[colorValues.length - 1] === "black" &&
      evenOrOdd(parseInt(textInput)) === "odd"
    ) {
      message = "Coupez le 4ème fil";
    } else if (blackCount === 0) {
      message = "Coupez le 2ème fil";
    } else {
      message = "Coupez le 1er fil";
    }
  }
  return <Text>{message}</Text>;
};
const RulesWires = () => {
  const [nbr, setNbr] = useState(0);
  const [colorValues, setColorValues] = useState([]);
  const [textInput, setTextInput] = useState("");

  console.log(colorValues);

  const handleChangeValue = (index, colorName) => {
    const newColorValues = [...colorValues];

    newColorValues[index] = colorName;
    setColorValues(newColorValues);
  };

  const handleWires = () => {
    let elements = [];
    for (let i = 0; i < nbr; i++) {
      elements.push(
        <View key={i}>
          <View
            style={{
              height: 200,
              width: 30,
              borderWidth: 1,
              borderColor: "grey",
              backgroundColor: colorValues[i] || "transparent",
            }}
          />
          <ColorInputs index={i} setColorValue={handleChangeValue} />
        </View>
      );
    }
    return elements;
  };

  const DisplayInput = () => {
    if (nbr === 3 || nbr === 0) {
      return null;
    }
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: 100,
          width: 300,
        }}
      >
        <Text>Entrez le dernier numéro de série de la bombe</Text>
        <TextInput
          style={styles.inputText}
          value={textInput}
          onChangeText={(text) => {
            setTextInput(text);
          }}
        />
      </View>
    );
  };

  const ColorInputs = ({ index, setColorValue }) => {
    return (
      <View style={styles.colorInputsContainer}>
        {colors.map((color, colorIndex) => (
          <TouchableOpacity
            key={colorIndex}
            onPress={() => setColorValue(index, color)}
            style={[styles.colorButton, { backgroundColor: color }]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBtn}>
        <Text>Choisir le nombre de fils présent sur le module</Text>
        <View style={styles.strBtn}>
          {nbWires.map((fil, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setNbr(fil);
              }}
              style={styles.button}
            >
              <Text>{fil}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.nbWires}>{handleWires()}</View>
      <DisplayInput />
      <CutWires nbr={nbr} colorValues={colorValues} textInput={textInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  topBtn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  strBtn: {
    flexDirection: "row",
    marginVertical: 20,
  },
  button: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 100,
  },
  nbWires: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  colorInputsContainer: {
    flexDirection: "column",
    height: 150,
  },
  colorButton: {
    height: 20,
    width: 30,
    marginVertical: 2,
  },
  inputText: {
    textAlign: "center",
    borderWidth: 2,
    borderColor: "black",
    width: "50%",
  },
});

export default RulesWires;
