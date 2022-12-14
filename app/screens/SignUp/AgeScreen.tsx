import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Appearance,
} from 'react-native'
import RegisterButton from '../../components/UI/RegisterButton'
import { LinearGradient } from 'expo-linear-gradient'
import { addItem } from '../../redux/registerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterStateData } from '../../types/types'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import BackButton from '../../components/UI/BackButton'

interface EmailScreenProps {
  navigation: any
}
const AgeScreen = ({ navigation }: EmailScreenProps) => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [error, setError] = useState('')
  const [date, setDate] = useState(JSON.stringify(new Date().toISOString))
  const dispatch = useDispatch()

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      const age = moment().diff(date, 'years')

      if (age > 17 && age < 100) {
        setIsDisabled(false)
        setError('')
        dispatch(addItem({ value: 'age', data: age }))
      } else {
        setIsDisabled(true)
        if (age < 18) {
          setError('You are too young :(')
        } else {
          setError('You are too old :(')
        }
      }
    }

    return () => {
      isMounted = false
    }
  }, [date])

  const colorScheme = Appearance.getColorScheme()
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#AD439C', '#FAAEBE']}
          style={styles.linearGradient}
        >
          <View style={styles.whiteContainer}>
            <BackButton navigation={navigation} />
            <Text style={styles.title}>What's your day of birth?</Text>

            <DatePicker
              style={styles.datePickerContainer}
              mode='date'
              date={date}
              placeholder='Select date'
              format='YYYY-MM-DD'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              customStyles={{
                dateIcon: {
                  display: 'none',
                },
                dateInput: {
                  borderColor: 'gray',
                  borderWidth: 0,
                  borderBottomWidth: 2,
                },
                dateText: {
                  fontFamily: 'montRegular',
                  fontSize: 20,
                },
                datePickerCon: {
                  backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
                },
                datePicker: {
                  backgroundColor: colorScheme === 'dark' ? '#222' : '#fff',
                },
              }}
              onDateChange={(date) => {
                setDate(date)
              }}
            />

            <Text style={styles.error}>{date && error}</Text>
            <RegisterButton
              isDisabled={isDisabled}
              toScreen='genderInput'
              navigation={navigation}
            />
          </View>
          <Image
            style={styles.bcgHearths}
            source={require('../../images/Hearts.png')}
          />
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
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
    minHeight: '60%',
    width: '100%',
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    width: '80%',
    fontFamily: 'montSBold',
  },
  error: {
    color: 'red',
    marginTop: '2%',
    marginBottom: '15%',
    height: 25,
  },
  input: {
    width: '20%',
    height: '10%',
    marginTop: '15%',
    marginBottom: '15%',
    textAlign: 'center',
    fontSize: 24,
    borderBottomColor: '#1E1E1E',
    borderBottomWidth: 1,
    fontFamily: 'montRegular',
  },
  bcgHearths: {
    position: 'absolute',
    top: '60%',
    zIndex: -1,
  },
  datePickerContainer: {
    marginTop: '15%',
  },
})
export default AgeScreen
