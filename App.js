import { StyleSheet, Text, View, ScrollView } from 'react-native';
import InputContainer from './components/InputContainer';
import CardContainer from './components/CardContainer';
import { useState } from 'react'

export default function App() {
  const [formData, setFormData] = useState({
    cardNum: "",
    cvv: "",
    name: "",
    month: "",
    year: "",
    focus: false
  });
  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <CardContainer formData={formData} />
      </View>
      <View style={styles.inputWrapper}>
        <InputContainer formData={formData} updateFormData={updateFormData} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  cardWrapper: {
    position: 'fixed',
    top: 20, // Adjust for slight overlap
    zIndex: 1, // Ensures Card is above InputContainer
    width: '50%',
  },
  inputWrapper: {
    position: 'fixed',
    top: 150,
    zIndex: 0,
  }
});
