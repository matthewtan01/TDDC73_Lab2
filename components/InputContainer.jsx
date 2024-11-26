import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';

const yearArray = [
    { label: 'Year', value: 'year', disabled: true },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
    { label: '2028', value: '2028' },
    { label: '2029', value: '2029' },
    { label: '2030', value: '2030' },
    { label: '2031', value: '2031' },
];

const monthArray = [
    { label: 'Month', value: 'month', disabled: true },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
];

const InputContainer = ({formData, updateFormData}) => {
    // DropDownPicker state
    const [monthOpen, setMonthOpen] = useState(false);
    const [yearOpen, setYearOpen] = useState(false);
    const [monthValue, setMonthValue] = useState(null);
    const [yearValue, setYearValue] = useState(null);

    const handleMonthOpen = () => {
        setMonthOpen(true);
        setYearOpen(false);
    };

    const handleYearOpen = () => {
        setYearOpen(true);
        setMonthOpen(false);
    };


    return (
        <View style={styles.form}>
            <View style={styles.block}>
                <Text style={styles.text}>Card Number</Text>
                <TextInput
                    style={styles.input}
                    value={formData.cardNum}
                    placeholder="Enter card number"
                    onChangeText={(text) => {
                        // Filter non-numeric characters
                        const numericText = text.replace(/[^0-9]/g, ""); 
                        updateFormData("cardNum", numericText);
                    }}
                    keyboardType="numeric"
                    maxLength={16}
                />
            </View>
            <View style={styles.block}>
                <Text style={styles.text}>Card Name</Text>
                <TextInput
                    style={styles.input}
                    value={formData.name}
                    placeholder="Enter card name"
                    onChangeText={(text) => updateFormData("name", text)}
                    maxLength={15}
                />
            </View>
            <View style={styles.row}>
                <View style={[styles.dropDownContainer, { marginRight: 10 }]}>
                    <Text style={styles.text}>Expiration Date</Text>
                    <DropDownPicker
                        open={monthOpen}
                        setOpen={setMonthOpen}
                        items={monthArray}
                        value={formData.month}
                        setValue={(callback) =>
                            updateFormData("month", typeof callback === "function" ? callback(formData.month) : callback)
                        }
                        placeholder="Month"
                        style={styles.pickerStyle}
                    />
                </View>
                <View style={[styles.dropDownContainer, { marginRight: 10 }]}>
                    <Text style={styles.text}></Text>
                    <DropDownPicker
                        open={yearOpen}
                        setOpen={setYearOpen}
                        items={yearArray}
                        value={formData.year}
                        setValue={(callback) =>
                            updateFormData("year", typeof callback === "function" ? callback(formData.year) : callback)
                        }
                        placeholder="Year"
                        style={styles.pickerStyle}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.text}>CVV</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.cvv}
                        placeholder="Enter CVV"
                        keyboardType="numeric"
                        maxLength={3}
                        onChangeText={(text) => updateFormData("cvv", text)}
                        onFocus={()=>{updateFormData("focus", true)}}
                        onBlur={()=>{updateFormData("focus", false)}}
                    />
                </View>
            </View>
            <View style={styles.button}>
                <Button 
                    title='Submit'
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        marginTop: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignSelf: "center",
        width: "90%",
        maxWidth: 350,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 4,
        width: "100%",
    },
    block: {
        marginTop: 15,
    },
    text: {
        fontSize: 10,
        fontWeight: "500",
        marginBottom: 4,
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-start", // Align all inputs and dropdowns to the same baseline
        marginTop: 15,
    },
    dropDownContainer: {
        flex: 1,
    },
    pickerStyle: {
        borderColor: "gray",
        height: 40, // Same height as TextInput
        paddingHorizontal: 5,
    },
    button: {
        marginTop: 20
    }
});

export default InputContainer;
