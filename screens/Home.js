import {
    Text,
    VStack,
    Button,
    Center,
  } from "native-base";

  import { useNavigation } from '@react-navigation/native'
import { useWindowDimensions } from "react-native";

export default function Home() {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const navigate = (to) => {
        navigation.navigate(to);
    }

    return (
        <Center height={height*0.9}>
            <VStack>
                <Button onPress={() => navigate("New Average")}>
                    <Text>New</Text>
                </Button>
                <Button marginTop={"10"} onPress={() => navigate("History")}>
                    <Text>History</Text>
                </Button>
            </VStack>
        </Center>
    )
}