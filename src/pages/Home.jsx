import * as React from 'react';
import { View, Text, Image } from 'react-native';
import Ktane from './../../assets/ktane/ktane-logo.png'


const Home=()=> {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={Ktane} style={{resizeMode: 'contain', width:400}}/>
      </View>
    );
  }

  export default Home;
