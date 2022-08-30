import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./src/pages/Home/Home";
import Forms from "./src/pages/Forms/Forms";

const StackApp = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="Home">
        <StackApp.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />

        <StackApp.Screen
          name="Forms"
          component={Forms}
          options={{
            headerShown: false,
          }}
        />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}
