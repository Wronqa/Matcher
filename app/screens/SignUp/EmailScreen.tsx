import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import RegisterButton from '../../components/UI/RegisterButton'
import { LinearGradient } from 'expo-linear-gradient'
import { RegisterUserData } from '../../types/types'
import { useDispatch, useSelector } from 'react-redux'
import { addEmail } from '../../redux/registerSlice'

interface EmailScreenProps {
  navigation: any
}
const EmailScreen = ({ navigation }: EmailScreenProps) => {
  const dispatch = useDispatch()
  const count = useSelector((state: RegisterUserData) => state)

  const emailHandler = (email: string) => {
    dispatch(addEmail(email))
    console.log(count)
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#AD439C', '#FAAEBE']}
        style={styles.linearGradient}
      >
        <View style={styles.whiteContainer}>
          <Text style={styles.title}>Your Email is...</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => emailHandler(newText)}
            placeholder='Enter your email'
          />
          <RegisterButton toScreen='passwordInput' navigation={navigation} />
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    borderRadius: 5,
    height: '100%',
    width: '100%',
  },
  whiteContainer: {
    backgroundColor: '#FFFFFF',
    height: '64%',
    width: '100%',
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    marginTop: '15%',
  },
  btnTitle: {
    fontSize: 20,
    marginTop: '15%',
  },
  input: {
    width: '80%',
    backgroundColor: '#F7F7F7',
    height: '10%',
    marginTop: '40%',
  },
  btn: {},
})
export default EmailScreen
