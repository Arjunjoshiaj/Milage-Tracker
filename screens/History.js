import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Button, Center, ScrollView, Text, VStack } from "native-base";
import { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";


function HistoryItem ({date, average, miles, gas, cost, note, type}) {
    
    const {width} = useWindowDimensions();

    return (
    <Box w={width*0.8} borderColor={"black"} borderWidth={"1px"} mt={5}>
        <Text>Date: {date}</Text>
        <Text>Type: {type}</Text>
        <Text>Average: <Text underline>{average}</Text></Text>
        <Text>Miles: {miles}</Text>
        <Text>Gas: {gas}</Text>
        <Text>Price: {cost}</Text>
        <Text>Note: {note}</Text>
    </Box>
    )
}

export default function History() {

    
    const [history, setHistory] = useState([]);
    const scrollView = useRef();

    useEffect(() => {
        const getHistory = async () => {
            const resp = await AsyncStorage.getItem("history");
            if(resp) setHistory(await JSON.parse(resp));
        }
        getHistory();
    }, [])

    const deleteLast = async () => {
        const resp = await JSON.parse(await AsyncStorage.getItem("history"));
        resp.pop();
        await AsyncStorage.setItem("history", JSON.stringify(resp));
        const latest = resp[resp.length -1];
        if(latest) var miles = latest.miles;
        await AsyncStorage.setItem("prevMiles", miles || "0");
        setHistory(resp);
    }
    

    return(
        <ScrollView ref={scrollView} onContentSizeChange={() => scrollView.current.scrollToEnd({animated: true})}>
            <Center>
                <VStack>
                    {history.map(item => {
                        return <HistoryItem key={item.miles} {...item} />
                    })}
                </VStack>
            </Center>
            <Button onPress={deleteLast} w={40} alignSelf={"center"} mt={10} mb={10}>Delete Last</Button>
        </ScrollView>
    )
}