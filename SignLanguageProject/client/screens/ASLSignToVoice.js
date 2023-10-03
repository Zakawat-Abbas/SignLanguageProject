import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions, LogBox } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import IconFlip from '../assets/icons/IconFlip';
import Tts from 'react-native-tts'
import axios from 'axios';
Tts.setDefaultLanguage('en-US')
LogBox.ignoreAllLogs();


export default function ASLSignToVoice() {
  const [recognizedText, setRecognizedText] = useState('');
  const [camView, setcamView] = useState("back");
  const devices = useCameraDevices();
  const device = camView === 'back' ? devices.back : devices.front;
  const cameraRef = useRef(null);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();

    console.log(newCameraPermission);
  };

  const handleRecognizedWord = (word) => {
    setRecognizedText(prevText => {
      if (prevText[prevText.length] !== word) {
        return [...prevText, word]
      } else {
        return prevText
      }
    });
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!!!recording) {
        console.log('==============');
        console.log('recording is off');
        return;
      }

      const photo = await cameraRef.current.takePhoto({ quality: 0.8, exif: false, disableShutterSound: false });
      console.log(photo.path);

      let bodyFormData = new FormData();
      bodyFormData.append('file', {
        uri: `file://${photo.path}`,
        type: 'image/jpeg',
        name: 'test.jpg',
      });

      // fetch('https://sign-language-project-pink.vercel.app/predict', {
      fetch('http://172.20.10.3:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: bodyFormData,
      }).then(function (response) {
        return response.text();
      })
        .then(function (data) {
          console.log(data);
          console.log('==============')
          console.log('prediction result:', data);


          // if (data == 'space') {
          //   handleRecognizedWord(' ');
          // } else {
          handleRecognizedWord(data);
          // }
        })
        .catch(function (error) {
          console.log(error);
        });

    }, 5000);
    return () => clearInterval(interval);
  }, [recording]);




  if (recording) {
    console.log("recognizedText:", recognizedText);
  }

  if (device == null) return <ActivityIndicator />;

  return (
    <View style={{
      flex: 1,
    }}>
      <Camera
        style={StyleSheet.absoluteFill}
        photo={true}
        device={device}
        isActive={true}
        ref={cameraRef}
      />

      <View
        style={{
          width: Dimensions.get('window').width,
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row'
        }}>
        <View
          style={{
            flex: 1,
            height: 260,
            alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'white',
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35

          }}
        >
          <View
            style={{
              flex: 1,
              width: Dimensions.get('window').width,
              alignSelf: 'flex-end',
              alignItems: 'center',

            }}
          >
            <Text
              style={{
                marginTop: 18,
                fontFamily: 'Galano-Grotesque-Bold',
                fontSize: 17,
                textAlign: 'center',
                color: '#105E26',
              }}
            >
              {recognizedText.length > 0 ? 'Translation Results' : ''}
            </Text>

            <TouchableOpacity
              style={{
                paddingVertical: 18,
                paddingBottom: 0

              }}
              hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
              onPress={() => { setRecognizedText(recognizedText.slice(0, -1)) }}
            >

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text
                  style={{
                    marginBottom: 32,
                    textAlign: 'center',
                    fontSize: recognizedText.length > 0 ? 32 : 18,
                    fontFamily: 'Galano-Grotesque-Bold',
                    color: recognizedText.length > 0 ? 'black' : 'gray'
                  }}
                >
                  {
                    recognizedText.length > 0 ?
                      recognizedText :
                      "Press 'Record' to start"
                  }
                </Text>
                {
                  recognizedText.length > 0 ? <Image
                    style={{
                      width: 24,
                      height: 20,
                      marginLeft: 8,
                      marginBottom: 32,
                      resizeMode: 'stretch',
                    }}
                    source={require('../assets/images/ImageBackspace.png')}
                  /> : <></>
                }
              </View>

            </TouchableOpacity>
            <TouchableOpacity
              style={{

                paddingVertical: 18,
                paddingTop: 0
              }}
              hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
              onPress={() => { Tts.speak(recognizedText.join('')) }}
            // onPress={() => Tts.speak('Hello')}
            // onPress={() => Tts.speak(recognizedText)}
            >
              {
                recognizedText.length > 0 ? <Image
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 8,
                    resizeMode: 'stretch',
                  }}
                  source={require('../assets/images/Speaker.png')}
                /> : <></>
              }

            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                width: Dimensions.get('window').width,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >

              <TouchableOpacity
                onPress={() => { setRecording(!!!recording) }}
              // onPress={takePicture}
              >
                <View
                  style={{
                    height: 70,
                    width: 70,
                    backgroundColor: 'red',
                    borderRadius: 35,
                    borderWidth: recording ? 5 : 20,
                    borderColor: 'white',
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: 30

                }}
              />
              <TouchableOpacity onPress={() => {
                camView === 'back' ? setcamView('front') : setcamView('back');
              }}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3
                  }}
                >
                  <IconFlip />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>

  );
};
