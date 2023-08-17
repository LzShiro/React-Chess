import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import {margins, windowWidth} from '../styles';

const Login = ({navigation}: {navigation: any}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    if (username === '' && password === '') {
      navigation.navigate('Loading' as never);
    } else {
      setModalVisible(true);
    }
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Invalid username or password</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.whiteContainer}>
        <View style={styles.centerContent}>
          <Image
            source={require('../../assets/Pawn.png')}
            style={[styles.pawnImage, styles.shadow]}
          />
          <Text style={[styles.mainText, styles.shadow]}>Chess</Text>
        </View>
        <View style={styles.blankSpace} />
        <View style={styles.grayContainer}>
          <TextInput
            style={[styles.textInput, styles.shadow, {marginTop: 75}]}
            placeholder="Username"
            placeholderTextColor="gray"
            textAlign="left"
            onChangeText={newUsername => setUsername(newUsername)}
            value={username}
          />
          <TextInput
            style={[styles.textInput, styles.shadow, {marginTop: 10}]}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry={true}
            onChangeText={newPassword => setPassword(newPassword)}
            value={password}
          />
          <TouchableOpacity style={[styles.signUpButton, styles.shadow]}>
            <Text
              style={styles.textSignIn}
              onPress={() => {
                navigation.navigate('Signup' as never);
              }}>
              Sign up
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.buttonSignIn, styles.shadow]}
              onPress={handleLogin}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: '#737373',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  blankSpace: {
    height: '55%',
  },
  buttonSignIn: {
    backgroundColor: '#d9d9d9',
    marginBotton: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    opacity: 1,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    lineHeight: 21,
    opacity: 1,
    letterSpacing: 0.25,
  },
  signUpButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  centerContent: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  pawnImage: {
    width: 170,
    height: 170,
    marginTop: 30,
  },
  mainText: {
    fontSize: 32,
    marginTop: 16,
    fontFamily: 'Arial',
  },
  textInput: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    alignSelf: 'center',
    color: 'black',
    width: windowWidth - margins.medium * 2,
    height: 40,
    marginHorizontal: margins.medium,
  },
  textSignIn: {
    color: '#1B24FF',
    fontSize: 16,
  },
  input: {
    color: 'white',
    fontSize: 16,
  },
  flexContainer: {
    flex: 2,
  },
  boldText: {
    fontWeight: 'bold',
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#000000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Login;
