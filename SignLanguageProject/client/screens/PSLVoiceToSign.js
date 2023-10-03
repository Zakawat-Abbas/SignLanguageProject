import { Text, SafeAreaView, View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '../components/Images';
import Icon from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-voice/voice';
// import axios from 'axios';

export default function PSLVoiceToSign() {
    const [text, setText] = useState("");
    const [playing, setPlaying] = useState(false);
    const [counterPlayed, setCounterPlayed] = useState(0);
    const [recognized, setRecognized] = useState('');
    const [started, setStarted] = useState('');
    const [results, setResults] = useState([]);

    // async function translateText(word) {
    //     const options = {
    //         method: 'POST',
    //         url: 'https://translate-plus.p.rapidapi.com/translate',
    //         headers: {
    //             'content-type': 'application/json',
    //             'X-RapidAPI-Key': '495cfb52edmsh00d0f4ffdddec3fp139caajsne65716e5d982',
    //             'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
    //         },
    //         data: {
    //             text: word,
    //             source: 'hi',
    //             target: 'ur'
    //         }
    //     };

    //     try {
    //         const response = await axios.request(options);
    //         const translation = response.data.translations.translation;
    //         console.log("Response:", translation);
    //         // translation.replace(/\۔/g, "");
    //         // translation.replace(/\./g, "");
    //         let translationWithoutFullStop = translation.replace(/\۔/g, "");
    //         // let originalString = "Hello, world.";
    //         // let stringWithoutFullStop = originalString.replace(/\./g, "");

    //         // console.log(translationWithoutFullStop); // Output: "Hello, world"

    //         setResults(translationWithoutFullStop);
    //         setText(translationWithoutFullStop);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechRecognized = onSpeechRecognized;
        Voice.onSpeechResults = onSpeechResults;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechStart = (e) => {
        setStarted('√');
    };

    const onSpeechRecognized = (e) => {
        setRecognized('√');
    };


    const onSpeechResults = async (e) => {
        let text = e.value[0]
        console.log("Response:", text);
        setResults(text);
        setText(text);
        // translateText(text);
    };

    const startRecognition = async () => {
        console.log('Microphone Pressed')
        setRecognized('');
        setStarted('');
        setResults([]);

        try {
            // await Voice.start('en-US');
            // await Voice.start('hi-IN');
            await Voice.start('ur-PK');
            // await Voice.start('fr-FR');
        } catch (e) {
            console.error(e);
        }
    };

    const handleTextChange = (value) => {
        setResults(value);
        setText(value);
    };


    const renderTranslationCards = () => {
        return text.split('').map((letter, idx) => {
            const imageUrl = images[letter.toUpperCase()];
            if (letter == " ") {
                letter = "SPACE"
            }
            return (
                <View
                    key={idx}
                    style={{
                        width: 200,
                        height: 220,
                        margin: 20,
                        borderRadius: 10,
                        backgroundColor: 'white',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            resizeMode: 'stretch',
                            marginBottom: 18
                        }}
                        source={imageUrl}
                    />
                    <Text
                        style={{
                            fontFamily: 'Galano-Grotesque-Bold',
                            fontSize: 24,
                            color: 'black'
                        }}
                    >
                        {letter.toUpperCase()}
                    </Text>
                </View>
            )
        })
    }

    const renderTranslationSlideShow = () => {
        const imageUrl = images[text.split('')[counterPlayed % text.length].toUpperCase()];
        return (
            <View
                style={{
                    width: 200,
                    height: 220,
                    margin: 20,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    style={{
                        width: 150,
                        height: 150,
                        resizeMode: 'stretch',
                        marginBottom: 18
                    }}
                    source={imageUrl}
                />
                <Text
                    style={{
                        fontFamily: 'Galano-Grotesque-Bold',
                        fontSize: 24,
                        color: 'black'

                    }}
                >
                    {text.split('')[counterPlayed % text.length].toUpperCase()}
                </Text>
            </View>
        )
    }

    useEffect(() => {
        const intervalID = setTimeout(() => {
            console.log('==============');
            console.log('currently playing... counter at ' + counterPlayed);
            console.log('length of text:', text.length);
            if (counterPlayed >= text.length - 1) {
                setPlaying(false);
            } else {
                setCounterPlayed(counterPlayed + 1)
            }
        }, 1000);

        return () => clearInterval(intervalID);
    }, [counterPlayed, playing]);

    const renderTranslationSlider = () => {
        return (
            <View style={{ alignItems: "center" }}>
                {
                    playing ?
                        <>{renderTranslationSlideShow()}</> :
                        <ScrollView horizontal>
                            {renderTranslationCards()}
                        </ScrollView>
                }
                <TouchableOpacity
                    style={{
                        backgroundColor: playing ? 'red' : '#105E26',
                        paddingTop: 5,
                        width: '20%',
                        borderRadius: 15,
                        marginTop: 20
                    }}
                    onPress={() => { setCounterPlayed(0); setPlaying(!playing) }}
                >
                    <Text
                        style={{
                            fontFamily: 'Galano-Grotesque-Bold',
                            fontSize: 18,
                            marginBottom: 5,
                            textAlign: 'center',
                            color: 'white',
                            padding: 5,

                        }}

                    >
                        {playing ? 'Stop' : 'Play'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#fff',
            }}
        >
            <ScrollView>
                <View
                    style={{
                        marginTop: 30,
                        marginHorizontal: 30
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'Galano-Grotesque-Bold',
                            fontSize: 24,
                            marginBottom: 28,
                            textAlign: 'center',
                            color: "#105E26",

                        }}
                    >
                        Voice to Sign
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    height: 48,
                    borderRadius: 20,
                    paddingHorizontal: 16,
                    shadowOffset: { width: 0, height: 1 },
                    shadowRadius: 2,
                    elevation: 2,
                    shadowOpacity: 0.4,
                    marginLeft: 30,
                    marginRight: 30
                }}>
                    <TextInput
                        value={results.toString()}
                        placeholder="Write the word here"
                        placeholderTextColor="gray"
                        style={{
                            flex: 1,
                            color: 'black'

                        }}
                        onChangeText={handleTextChange}
                    />

                    <TouchableOpacity
                        onPress={startRecognition}
                        hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
                    >
                        <Icon name="microphone" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        marginTop: 40,
                        marginHorizontal: 30
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'Galano-Grotesque-Bold',
                            fontSize: 18,
                            marginBottom: 18,
                            color: "#105E26",
                        }}
                    >
                        Translation results
                    </Text>
                    {text.length > 0 ? renderTranslationSlider() : <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'Galano-Grotesque-Bold',
                                fontSize: 20,
                                marginTop: 64,
                                textAlign: 'center',
                                color: 'gray'
                            }}
                        >
                            Write the word you want to translate
                        </Text>
                    </View>}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
