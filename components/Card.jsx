import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
const Card = ({formData}) => {
    const cardTypes = [
        {type: 'visa', re: '^4'},
        {type: 'amex', re: '^(34|37)'},
        {type: 'mastercard', re: '^5[1-5]'},
        {type: 'discover', re: '^6011'},
        {type: 'troy', re: '^9792'},
    ];

    const getCardType = () => {
        let cardNumber = formData.cardNum;

        // Find the first matching card type
        const match = cardTypes.find((cc) => cardNumber.match(new RegExp(cc.re)) != null);

        // Return the matched card type or 'unknown' if no match is found
        return match ? match.type : 'visa';
    }

    const cardImages = {
        visa: require('../assets/images/visa.png'),
        amex: require('../assets/images/amex.png'),
        mastercard: require('../assets/images/mastercard.png'),
        discover: require('../assets/images/discover.png'),
        troy: require('../assets/images/troy.png'),
    };
      
    const getImage = (cardType) => {
        return cardImages[cardType]
    };

    const cardType = getCardType();
    const ImageLink = getImage();
    const [placeholder, setPlaceHolder] = useState("#### #### #### #####");
    const [placeholder1, setPlaceHolder1] = useState("MM/YY")

    useEffect(() => {
        const rawCardNum = formData.cardNum || "";
        const basePlaceholder = "################";

        // Merge rawCardNum with basePlaceholder
        const updatedPlaceholder = rawCardNum + basePlaceholder.slice(rawCardNum.length);

        // Format the placeholder to include spaces every 4 characters
        const formatted = updatedPlaceholder
            .match(/.{1,4}/g) // Split into groups of 4 characters
            .join(' '); // Join with spaces

        setPlaceHolder(formatted);
    }, [formData.cardNum]);

    useEffect(()=> {
        let month = "";
        let year = "";
        if (formData.month == ""){
            month = "MM";
        }
        else{
            month = formData.month.length === 1 ? `0${formData.month}` : formData.month;
        }
        if (formData.year == ""){
            year = "YY";
        }
        else{
            year = formData.year.slice(-2);
        }
        setPlaceHolder1(`${month}/${year}`);

    }, [formData.month, formData.year])
    
    const cardFront = () => {
        return(
        <View style={styles.container}>
                    {/* Background Image */}
                    <View style={styles.backgroundWrapper}>
                        <Image source={require("../assets/images/6.jpeg")} style={styles.background} />
                        {/* Dark Overlay */}
                        <View style={styles.overlay} />
                        {/* Inner Logo */}
                        <Image source={getImage(cardType)} style={styles.cardtype} />
                        <Image source={require('../assets/images/chip.png')} style={styles.chip} />
                        <Text style={styles.cardnum}>{placeholder}</Text>
                        <View style={styles.cardname_container}>
                            <Text style={styles.cardholder}>Card Holder</Text>
                            <Text style={styles.cardname}>{formData.name}</Text>
                        </View>
                        <View style={styles.expiry_container}>
                            <Text style={styles.cardholder}>Expires</Text>
                            <Text style={styles.cardname}>{placeholder1}</Text>
                        </View>
                    </View>
                </View>
                )
    }

    const cardBack = () => {
        return(
        <View style={styles.container}>
            {/* Background Image */}
            <View style={styles.backgroundWrapper}>
                <Image source={require("../assets/images/6.jpeg")} style={styles.background} />
                {/* Dark Overlay */}
                <View style={styles.overlay} />
                {/* Black Bar */}
                <View style={styles.blackBar} />
                {/* White Bar */}
                <Text style={styles.cvv_title}>CVV</Text>
                <View style={styles.whiteBar}>
                    <Text style={styles.cvv}>{formData.cvv}</Text>
                </View>
                
                {/* Inner Logo */}
                <Image source={getImage(cardType)} style={styles.cardtype_back} />
            </View>
        </View>)
    }

    return !formData.focus ? cardFront() : cardBack()
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    backgroundWrapper: {
        position: 'relative', // Enables absolute positioning for children
        width: 300,
        height: 200,
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for darkening effect
        borderRadius: 20, // Matches the outer image's borderRadius
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
        top : 20,
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
        fontSize: 10
    },
    cardname: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 14,
        letterSpacing: 1
    }, 
    expiry_container: {
        position: 'absolute',
        left: 235,
        bottom: 20
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
        top: "45%",
        height: 30,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    cvv_title: {
        position: 'absolute',
        left: "90%",
        top: "35%",
        color: 'white',
        fontSize: 10,
        fontFamily: 'monospace'
    },
    cvv: {
        position: 'absolute',
        right: '2%',
        top: "20%",
        color: 'black',
        fontSize: 14,
        fontFamily: 'monospace'
    },
});

export default Card;