import {
  NativeBaseProvider,
} from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import Home from "./screens/Home";
import New from "./screens/New";
import History from "./screens/History";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Average Calculator">
          <Stack.Screen name="Average Calculator" component={Home} />
          <Stack.Screen name="New Average" component={New} />
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
