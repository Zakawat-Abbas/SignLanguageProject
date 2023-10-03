import Home from './screens/Home';
import ASLSignToVoice from './screens/ASLSignToVoice';
import PSLSignToVoice from './screens/PSLSignToVoice';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ASLVoiceToSign from './screens/ASLVoiceToSign';
import PSLVoiceToSign from './screens/PSLVoiceToSign';
// import Translate from './screens/translate';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    // <VoiceToSign />
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' >
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} initialParams={{ title: 'Welcome', Text_1: 'ASL', Text_2: 'PSL', Text_3: 'ASL', Text_4: 'PSL' }} />
        <Stack.Screen name='ASL' component={Home} initialParams={{ title: 'ASL', Text_1: 'Sign To Voice', Text_2: 'Voice To Sign', Text_3: 'ASL Sign To Voice', Text_4: 'ASL Voice To Sign' }} />
        <Stack.Screen name='PSL' component={Home} initialParams={{ title: 'PSL', Text_1: 'Sign To Voice', Text_2: 'Voice To Sign', Text_3: 'PSL Sign To Voice', Text_4: 'PSL Voice To Sign' }} />
        <Stack.Screen name="ASL Sign To Voice" component={ASLSignToVoice} />
        <Stack.Screen name="PSL Sign To Voice" component={PSLSignToVoice} />
        <Stack.Screen name="ASL Voice To Sign" component={ASLVoiceToSign} />
        <Stack.Screen name="PSL Voice To Sign" component={PSLVoiceToSign} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


// // Sure, here is the code to use the translateText function in React Native:

// // JavaScript
// import React, { useState } from 'react';
// // import { Translate } from '@google-cloud/translate';
// import { Text, View } from 'react-native';

// const App = () => {
//   const [textToTranslate, setTextToTranslate] = useState('');
//   const [translation, setTranslation] = useState('');

//   // const translateText = async () => {
//   //   const translate = new Translate({
//   //     key: 'AIzaSyB_TuIAuJaNDtfaNtC0Hi2ZMq9niWzqF30',
//   //   });

//   //   const targetLanguage = 'ur'; // Language code for Urdu

//   //   try {
//   //     const [translation] = await translate.translate(textToTranslate, targetLanguage);
//   //     setTranslation(translation);
//   //   } catch (error) {
//   //     console.error('Translation error:', error);
//   //   }
//   // };

//   return (
//     // <div>
//     //   <input
//     //     type="text"
//     //     placeholder="Enter text to translate"
//     //     onChange={(e) => setTextToTranslate(e.target.value)}
//     //   />
//     //   <button onClick={translateText}>Translate</button>
//     //   <p>Translated text: {translation}</p>
//     // </div>
//     <View>
//       <Text>Hello</Text>
//     </View>
//   );
// };

// export default App;