import { Box, Button, Center, Input, KeyboardAvoidingView, ScrollView, Select, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";


export default function New() {
    const [form, setForm] = useState({
        type: "",
        miles: "",
        gas: "",
        cost: "",
        note: "",
    });
    const [average, setAverage] = useState(null);
    const [prevMiles, setPrevMiles] = useState(0);

    useEffect(() => {
        const getPrevMiles = async () => {
            const resp = await AsyncStorage.getItem("prevMiles");
            if(resp) setPrevMiles(resp);
        }
        getPrevMiles();
    }, []);

    const handleChange = (text, what) => {
        setForm(prev => ({ ...prev, [what]: text }));
    };

    const handleSubmit = async () => {
        
        if(!form.type) return;
        
        const getDate = () => {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            
            today = mm + '/' + dd + '/' + yyyy;
            return today;
        }

        const getId = () => {
            return Math.random()
            .toString(32)
            .substring(2)
        }


        if(form.type=="Empty" || form.type=="Partial") {
            if(form.miles <= prevMiles) return;
            if(!form.miles || !form.gas) return;
            await AsyncStorage.setItem("prevMiles", form.miles);
        } else {
            await AsyncStorage.removeItem("prevMiles")
        }
        var history = await AsyncStorage.getItem("history");
        if(!history) history = [];
        else history = await JSON.parse(history);
        if(prevMiles) {
            var average = ((form.miles - prevMiles)/form.gas).toFixed(2);
        }
        else {
            average = 0;
        }
        setAverage(average);
        setPrevMiles(form.miles);
        history.push({...form, date: getDate(), average, id: getId()});
        await AsyncStorage.setItem("history", JSON.stringify(history));
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios"? "padding": "height"}>
            <ScrollView>

            <Center>
                <VStack flex="1" justifyContent="flex-end" w="100%" maxW={300}>
                    <Box margin={5}>
                        Type:
                        <Select placeholder="Select a Type" selectedValue={form.type} onValueChange={(text) => handleChange(text, "type")} >
                            <Select.Item label="Empty" value="Empty" />
                            <Select.Item label="Partial" value="Partial" />
                            <Select.Item label="Forgot" value="Forgot" />
                        </Select>
                    </Box>
                    <Box margin={5}>
                        Milage:
                        <Input placeholder="Current miles" keyboardType="numeric" value={form.miles} onChangeText={(text) => handleChange(text, "miles")} />
                    </Box>
                    <Box margin={5}>
                        Gas:
                        <Input placeholder="How much gas did you fill?" keyboardType="numeric" value={form.gas} onChangeText={(text) => handleChange(text, "gas")} />
                    </Box>
                    <Box margin={5}>
                        Amount: (optional)
                        <Input placeholder="How much did it cost?" keyboardType="numeric" value={form.cost} onChangeText={(text) => handleChange(text, "cost")} />
                    </Box>
                    <Box margin={5}>
                        Note: (optional)
                        <Input placeholder="Note" value={form.note} onChangeText={(text) => handleChange(text, "note")} />
                    </Box>
                </VStack>
                <Box margin={5}>
                    <Button onPress={handleSubmit}>
                        <Text>Submit</Text>
                    </Button>
                </Box>
                <Box>
                    {average && `Average: ${average}`}
                </Box>
            </Center>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}