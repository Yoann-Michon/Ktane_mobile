import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";

const cbande = [
  { value: 4, color: "blue", name: "Bleu" },
  { value: 5, color: "yellow", name: "Jaune" },
  { value: 1, color: "transparent", name: "Autre" },
];

const tbande = (value) => {
  return `Relâcher lorsque le compte à rebours affiche un ${value} à n'importe quelle position`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  redButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  bandeButton: {
    width: 200,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  bandeButtonText: {
    color: "whitesmoke",
  },
  bandeButtonTextYellow: {
    color: "black",
  },
});

const RulesButton = () => {
  const [bandeValue, setBandeValue] = useState(0);
  const [toggle, setToggle] = useState(null);

  const DisplayBande = () => {
    return (
      <View>
        <Text>Cliquer sur la couleur de bande correspondante</Text>
        {cbande.map((bande) => (
          <TouchableOpacity
            key={bande.value}
            style={[
              styles.bandeButton,
              { backgroundColor: bande.color === "transparent" ? "grey" : bande.color },
            ]}
            onPress={() => setBandeValue(bande.value)}
          >
            <Text style={bande.color === "yellow" ? styles.bandeButtonTextYellow : styles.bandeButtonText}>
              {bande.name}
            </Text>
          </TouchableOpacity>
        ))}
        <Text>{bandeValue ? tbande(bandeValue) : ""}</Text>
      </View>
    );
  };

  const toggleBande = () => {
    if(toggle === true){
      return <Text>Appuyer et immédiatement relâcher le bouton</Text>
    }
    if(toggle === false){
      return <DisplayBande />
    }
    return null
  };

  return (
    <View style={styles.container}>
      <Text>êtes-vous dans l'un des deux cas suivants :</Text>
      <TouchableOpacity style={styles.redButton}>
        <Text style={styles.buttonText}>Maintenir</Text>
      </TouchableOpacity>
      <View>
        <Text>ou</Text>
      </View>
      <View>
        <Text>1 pile et bouton marqué « Exploser »</Text>
        <Text>2 piles et un indicateur allumé avec les lettres FRK</Text>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        <Button
          title="Oui"
          onPress={() => setToggle(true)}
        />
        <View style={{ width: 10 }} />
        <Button
          title="Non"
          onPress={() => setToggle(false)}
        />
      </View>
      {toggleBande()}
    </View>
  );
};

export default RulesButton;
