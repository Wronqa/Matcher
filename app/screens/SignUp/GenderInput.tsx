import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import RegisterButton from '../../components/UI/RegisterButton'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/registerSlice'
import BackButton from '../../components/UI/BackButton'

interface EmailScreenProps {
  navigation: any
}
const GenderScreen = ({ navigation }: EmailScreenProps) => {
  const [gender, setGender] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      if (gender.length > 1) {
        setIsDisabled(false)
        dispatch(addItem({ value: 'gender', data: gender }))
      } else {
        setIsDisabled(true)
      }
    }

    return () => {
      isMounted = false
    }
  }, [gender])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#AD439C', '#FAAEBE']}
        style={styles.linearGradient}
      >
        <View style={styles.whiteContainer}>
          <BackButton navigation={navigation} />
          <Text style={styles.title}>You are a ...</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setGender('Male')
            }}
          >
            <Text style={gender === 'Male' ? styles.textM : styles.text}>
              Male
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setGender('Female')
            }}
          >
            <Text style={gender === 'Female' ? styles.textF : styles.text}>
              Female
            </Text>
          </TouchableOpacity>
          <RegisterButton
            isDisabled={isDisabled}
            toScreen='searchForInput'
            navigation={navigation}
          />
        </View>
        <Image
          style={styles.bcgHearths}
          source={require('../../images/Hearts.png')}
        />
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
    minHeight: '64%',
    width: '100%',
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 55,
    marginBottom: '15%',
    width: '80%',
    fontFamily: 'montSBold',
  },
  btnTitle: {
    fontSize: 20,
    marginTop: '15%',
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 60,
    backgroundColor: 'transparent',
    borderColor: '#C04D9F',
    borderWidth: 3,
    marginBottom: '10%',
    borderRadius: 25,
  },
  text: {
    color: '#333',
    fontSize: 24,
    fontFamily: 'montMedium',
  },
  textM: {
    color: '#1c72fc',
    fontSize: 24,
    fontFamily: 'montMedium',
  },
  textF: {
    color: '#e317d9',
    fontSize: 24,
    fontFamily: 'montMedium',
  },
  bcgHearths: {
    position: 'absolute',
    top: '60%',
    zIndex: -1,
  },
})
export default GenderScreen
