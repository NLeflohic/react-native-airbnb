import React from "react";
import { AsyncStorage, StatusBar } from "react-native";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import RoomDetailScreen from "./containers/RoomDetailScreen";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  // const [currentOffer, setCurrentOffer] = React.useState(null);

  const setToken = async token => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (

    <NavigationNativeContainer>
      <StatusBar backgroundColor='#FF4858' barStyle="light-content" />
      <Stack.Navigator>

        {isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen name="Splash" component={() => null} />
        ) : userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn" options={{ header: () => null }}>
              {() => <SignInScreen setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="SignUp"
              options={{ title: "SignUp" }}
            >
              {() =>
                < SignUpScreen setToken={setToken} />
              }
            </Stack.Screen>
          </>
        ) : (
              // User is signed in
              <Stack.Screen name="Tab" options={{ header: () => null }}>
                {() => (
                  <Tab.Navigator
                    screenOptions={({ route }) => {
                      return {
                        tabBarIcon: ({ focused, color, size }) => {
                          let iconName;
                          if (route.name === "Settings") {
                            iconName = `ios-options`;
                          } else {
                            iconName = `ios-home`;
                          }
                          return (
                            <Ionicons name={iconName} size={size} color={color} />
                          );
                        },
                        //title: route.name // know issue : route.name shouldn't be undefined
                        title: route.name === "undefined" ? "Home" : route.name
                      };
                    }}
                    tabBarOptions={{
                      activeTintColor: "tomato",
                      inactiveTintColor: "gray"
                    }}
                  >
                    <Tab.Screen>
                      {() => (
                        <Stack.Navigator>
                          <Stack.Screen name="Home" options={{
                            title: "Mon Airbnb",
                            headerStyle: { backgroundColor: "#FF5B60" },
                            headerTitleStyle: { color: "white" }
                          }}>
                            {() => <HomeScreen />}
                          </Stack.Screen>
                          <Stack.Screen
                            name="RoomDetail"
                            options={{ title: "Room" }}
                          >
                            {() => <RoomDetailScreen item={null} />}
                          </Stack.Screen>
                          <Stack.Screen
                            name="Profile"
                            options={{ title: "User Profile" }}
                          >
                            {() => <ProfileScreen token={userToken} />}
                          </Stack.Screen>
                        </Stack.Navigator>
                      )}
                    </Tab.Screen>

                    <Tab.Screen name="Settings">
                      {() => (
                        <Stack.Navigator>
                          <Stack.Screen
                            name="Settings"
                            options={{ title: "Settings" }}
                          >
                            {() => <SettingsScreen setToken={setToken} />}
                          </Stack.Screen>
                        </Stack.Navigator>
                      )}
                    </Tab.Screen>
                  </Tab.Navigator>
                )}
              </Stack.Screen>
            )}
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
