import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import RegisterButton from "../../components/UI/RegisterButton";
import { LinearGradient } from "expo-linear-gradient";
import { RegisterUserData } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/registerSlice";
import BackButton from "../../components/UI/BackButton";
import { ScrollView } from "react-native-gesture-handler";

type Hobbies = {
  id: string;
  name: string;
  isChosen: boolean;
};
const hobbies: Hobbies[] = [
  { id: "0", name: "Music", isChosen: false },
  { id: "1", name: "Art", isChosen: false },
  { id: "2", name: "Cooking", isChosen: false },
  { id: "3", name: "Fishing", isChosen: false },
  { id: "4", name: "Baking", isChosen: false },
  { id: "5", name: "Walking", isChosen: false },
  { id: "6", name: "Outdoors", isChosen: false },
  { id: "7", name: "Photography", isChosen: false },
  { id: "8", name: "Travel", isChosen: false },
  { id: "9", name: "Movies", isChosen: false },
  { id: "10", name: "Working out", isChosen: false },
  { id: "11", name: "Yoga", isChosen: false },
  { id: "12", name: "Swimming", isChosen: false },
  { id: "13", name: "Instagram", isChosen: false },
  { id: "14", name: "Foodie", isChosen: false },
  { id: "15", name: "Astrology", isChosen: false },
  { id: "16", name: "Dancing", isChosen: false },
  { id: "17", name: "Board Games", isChosen: false },
  { id: "18", name: "Fasion", isChosen: false },
  { id: "19", name: "Cycling", isChosen: false },
  { id: "20", name: "Dog lover", isChosen: false },
  { id: "21", name: "Cat lover", isChosen: false },
  { id: "22", name: "Netflix", isChosen: false },
  { id: "23", name: "Politics", isChosen: false },
  { id: "24", name: "Volunteering", isChosen: false },
  { id: "25", name: "Wine", isChosen: false },
  { id: "26", name: "Craft Beer", isChosen: false },
  { id: "27", name: "History", isChosen: false },
  { id: "28", name: "Geography", isChosen: false },
  { id: "29", name: "Cars", isChosen: false },
  { id: "30", name: "Camping", isChosen: false },
  { id: "31", name: "Biology", isChosen: false },
  { id: "32", name: "Soccer", isChosen: false },
  { id: "33", name: "Psychology", isChosen: false },
  { id: "34", name: "Anime", isChosen: false },
  { id: "35", name: "DIY", isChosen: false },
];

interface EmailScreenProps {
  navigation: any;
}
const HobbyScreen = ({ navigation }: EmailScreenProps) => {
  const [restart, setRestart] = useState(false);
  const [chosenHobbies, setChosenHobbies] = useState<Hobbies[]>([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state: RegisterUserData) => state);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (chosenHobbies.length > 2) {
        setIsDisabled(false);
        dispatch(
          addItem({
            value: "hobbies",
            data: chosenHobbies.map((hobby) => hobby?.name),
          })
        );
        console.log(state);
      } else {
        setIsDisabled(true);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [chosenHobbies]);

  const filterBySearch = (item) => {
    if (item.name.includes(searchText)) {
      return true;
    } else {
      return false;
    }
  };

  const filteredHobbies = hobbies.filter(filterBySearch);

  const hobbiesList = filteredHobbies.map((hobby) => {
    return (
      <TouchableOpacity
        style={hobby.isChosen ? styles.chosenHobbyItem : styles.hobbyItem}
        key={hobby.id}
        onPress={() => {
          hobby.isChosen = !hobby.isChosen;
          setChosenHobbies(hobbies.filter((hoby) => hoby.isChosen === true));
          setRestart(!restart);
          console.log(chosenHobbies);
        }}
      >
        <Text
          style={hobby.isChosen ? styles.chosenHobbyText : styles.hobbyText}
          key={hobby.id}
        >
          {hobby.name}
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#AD439C", "#FAAEBE"]}
          style={styles.linearGradient}
        >
          <View style={styles.whiteContainer}>
            <BackButton navigation={navigation} />
            <Text style={styles.title}>What's your hobbies?</Text>
            <View style={styles.searchBarContainer}>
              <Image
                style={styles.searchIcon}
                source={require("../../images/searchIcon.png")}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#ABABAB"
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
              />
            </View>
            <ScrollView contentContainerStyle={styles.scroll}>
              <View style={styles.hobbiesContainer}>{hobbiesList}</View>
            </ScrollView>
            <View style={styles.btnContainer}>
              <RegisterButton
                isDisabled={isDisabled}
                toScreen="locationInput"
                navigation={navigation}
              />
            </View>
          </View>
          <Image
            style={styles.bcgHearths}
            source={require("../../images/Hearts.png")}
          />
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    width: "100%",
    marginTop: "10%",
  },

  hobbyText: {
    color: "#ABABAB",
    fontFamily: "montMedium",
  },
  chosenHobbyText: {
    color: "#CB54A0",
    fontFamily: "montMedium",
  },
  linearGradient: {
    borderRadius: 5,
    height: "100%",
    width: "100%",
  },
  whiteContainer: {
    backgroundColor: "#FFFFFF",
    minHeight: "95%",
    width: "100%",
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    marginBottom: "2%",
    width: "80%",
    fontFamily: "montSBold",
  },
  btnTitle: {
    fontSize: 20,
    marginTop: "15%",
  },
  hobbiesContainer: {
    width: "100%",
    // height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  hobbyItem: {
    backgroundColor: "#F2F2F2",
    padding: "3%",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2%",
    marginRight: "4%",
  },
  chosenHobbyItem: {
    backgroundColor: "#F2F2F2",
    padding: "3%",
    borderWidth: 1,
    borderColor: "#CB54A0",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2%",
    marginRight: "4%",
  },
  bcgHearths: {
    position: "absolute",
    top: "60%",
    zIndex: -1,
  },
  searchBarContainer: {
    width: "80%",
    marginTop: "1%",
    backgroundColor: "#F2F2F2",
    borderRadius: 15,
    height: 50,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "7%",
  },
  searchIcon: {
    marginLeft: 20,
    marginRight: 10,
  },
  searchInput: {
    width: "80%",
    height: 30,
    fontFamily: "montMedium",
    fontSize: 14,
  },
  scroll: {
    width: "80%",
    maxHeight: "40%",
  },
});
export default HobbyScreen;
