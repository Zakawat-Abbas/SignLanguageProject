import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { images } from '../components/Images';
import { useRoute } from '@react-navigation/native';

function Home({ navigation }) {
    const imageUrl = images['Welcome'];
    const route = useRoute();
    const { title, Text_1, Text_2, Text_3, Text_4 } = route.params;

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 20,
        }}>
            <Text style={{
                color: "#105E26",
                fontSize: 80,
                fontFamily: "DancingScript-Regular"
            }}>{title}</Text>
            <Image source={imageUrl} style={{
                width: 450,
                height: 450,
                resizeMode: 'contain',
                marginBottom: 40,
                marginTop: 20,
            }} />

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 50,
            }}>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(Text_3)}
                        style={{
                            backgroundColor: '#105E26',
                            padding: 8,
                            borderRadius: 15,
                            marginRight: 120,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'Galano-Grotesque-Bold',
                                fontSize: 18,
                                textAlign: 'center',
                                color: 'white',
                                padding: 5,

                            }}
                        >
                            {Text_1}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(Text_4)}
                        // onPress={() => navigation.navigate('PSL Voice To Sign')}
                        style={{
                            backgroundColor: '#105E26',
                            padding: 8,
                            borderRadius: 15
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'Galano-Grotesque-Bold',
                                fontSize: 18,
                                textAlign: 'center',
                                color: 'white',
                                padding: 5,
                            }}
                        >
                            {Text_2}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Home;