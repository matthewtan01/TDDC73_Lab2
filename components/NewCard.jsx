import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import { useState, useEffect, useRef } from 'react';

const NewCard = ({ formData, useFormData }) => {
  const cardTypes = [
    { type: 'visa', re: '^4' },
    { type: 'amex', re: '^(34|37)' },
    { type: 'mastercard', re: '^5[1-5]' },
    { type: 'discover', re: '^6011' },
    { type: 'troy', re: '^9792' },
  ];

  const getCardType = () => {
    let cardNumber = formData.cardNum;
    const match = cardTypes.find((cc) => cardNumber.match(new RegExp(cc.re)) != null);
    return match ? match.type : 'visa';
  };
  
  const cardImages = {
    visa: require('../assets/images/visa.png'),
    amex: require('../assets/images/amex.png'),
    mastercard: require('../assets/images/mastercard.png'),
    discover: require('../assets/images/discover.png'),
    troy: require('../assets/images/troy.png'),
  };

  const getImage = (cardType) => cardImages[cardType];
  const cardType = getCardType();
  
  const [placeholder, setPlaceHolder] = useState('#### #### #### #####');
  const [placeholder1, setPlaceHolder1] = useState('MM/YY');

  // Animation value
  const rotation = useRef(new Animated.Value(0)).current;

  // Update placeholder for card number
  useEffect(() => {
    const rawCardNum = formData.cardNum || '';
    const basePlaceholder = '################';
    const updatedPlaceholder = rawCardNum + basePlaceholder.slice(rawCardNum.length);
    const formatted = updatedPlaceholder.match(/.{1,4}/g)?.join(' ') || '';
    setPlaceHolder(formatted);
  }, [formData.cardNum]);

  // Update placeholder for expiration date
  useEffect(() => {
    const month = formData.month ? formData.month.padStart(2, '0') : 'MM';
    const year = formData.year ? formData.year.slice(-2) : 'YY';
    setPlaceHolder1(`${month}/${year}`);
  }, [formData.month, formData.year]);

  // Animate card flip
  useEffect(() => {
    Animated.timing(rotation, {
      toValue: formData.focus ? 1 : 0, // Rotate to 180 degrees (1) or back to 0 degrees
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [formData.focus]);

  // Interpolated rotation
  const rotateY = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Maps 0 to '0deg' and 1 to '180deg'
  });

  const cardFront = () => (
    <>
      <Image source={getImage(cardType)} style={styles.cardtype} />
      <Image source={require('../assets/images/chip.png')} style={styles.chip} />
      <Text style={styles.cardnum}>{placeholder}</Text>
      <View style={styles.cardname_container}>
        <Text style={styles.cardholder}>Card Holder</Text>
        <Text style={styles.cardname}>{formData.name.toUpperCase()}</Text>
      </View>
      <View style={styles.expiry_container}>
        <Text style={styles.cardholder}>Expires</Text>
        <Text style={styles.cardname}>{placeholder1}</Text>
      </View>
    </>
  );

  const cardBack = () => (
    <>
      <View style={styles.blackBar} />
      <Text style={styles.cvv_title}>CVV</Text>
      <View style={styles.whiteBar}>
        <Text style={styles.cvv}>{formData.cvv}</Text>
      </View>
      <Image source={getImage(cardType)} style={styles.cardtype_back} />
    </>
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.backgroundWrapper,
          { transform: [{ rotateY }]}, // Apply rotation animation
        ]}
      >
        <Image
          source={require('../assets/images/6.jpeg')}
          style={styles.background}
        />
        <View style={styles.overlay} />
        {!formData.focus ? cardFront() : cardBack()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  backgroundWrapper: {
    position: 'relative',
    width: 300,
    height: 200,
    borderRadius: 20,
    backfaceVisibility: 'visible', // Ensures back is not visible during flip
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  cardtype: {
    position: 'absolute',
    top: 10,
    right: 20,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  chip: {
    width: 40,
    height: 30,
    top: 20,
    position: 'absolute',
    left: 20,
    borderRadius: 3,
  },
  cardnum: {
    position: 'absolute',
    top: 80,
    color: 'white',
    left: 25,
    fontSize: 22,
    fontFamily: 'monospace',
  },
  cardname_container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  cardholder: {
    color: 'white',
    fontFamily: 'monospace',
    fontSize: 10,
  },
  cardname: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
    letterSpacing: 1,
  },
  expiry_container: {
    position: 'absolute',
    left: 235,
    bottom: 20,
  },
  cardtype_back: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  blackBar: {
    position: 'absolute',
    top: 25,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  whiteBar: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: '45%',
    height: 30,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  cvv_title: {
    position: 'absolute',
    left: '90%',
    top: '35%',
    color: 'white',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  cvv: {
    position: 'absolute',
    right: '2%',
    top: '20%',
    color: 'black',
    fontSize: 14,
    fontFamily: 'monospace',
  },
});

export default NewCard;
