import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SectionList, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import Library from './Library';
import React, { PureComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from './DetailsScreen';
import ActorsScreen from './ActorsScreen';
import Search from './Search';
import GenreScreen from './GenreScreen';
import Home from './Home';
import Cinema from './Cinema';
import Booking from './Booking';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class HomeScreen extends PureComponent {
  render() {
    return (
      <View style={styles.tabContainer}>
        <Stack.Navigator>
          <Stack.Screen style={styles.tabContainer} name="Movies" component={Home} options={{
            title: 'Movies',
            headerRight: () => (
              <View>
                <TouchableOpacity style={[{ marginRight: 20 }]}>
                  <AntDesign name="search1" size={28} color="white" />
                </TouchableOpacity>
              </View>
            ),
            headerStyle: {
              backgroundColor: '#101010',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '500',
            },
            headerTitleAlign: 'center',
          }} />
          <Stack.Screen style={styles.tabContainer} name="Cinema" component={Cinema} options={({ route }) => ({
            title: route.params.item.name,
            headerStyle: {
              backgroundColor: '#101010',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerTitleAlign: 'center',

          })} />
          <Stack.Screen style={styles.tabContainer} name="Booking" component={Booking} options={({ route }) => ({
            title: route.params.movie.name,
            headerStyle: {
              backgroundColor: '#101010',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerTitleAlign: 'center',

          })} />
        </Stack.Navigator>
      </View>
    );
  }
}

class Lib extends PureComponent {
  render() {
    return (
      <View style={styles.tabContainer}>
        <Stack.Navigator>
          <Stack.Screen style={styles.tabContainer} name="Movies" component={Library} options={{
            title: 'Movies',
            headerRight: () => (
              <View>
                <TouchableOpacity style={[{ marginRight: 20 }]}>
                  <AntDesign name="search1" size={28} color="white" />
                </TouchableOpacity>
              </View>
            ),
            headerStyle: {
              backgroundColor: '#101010',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '500',
            },
            headerTitleAlign: 'center',
          }} />
          <Stack.Screen name="Details" component={DetailsScreen} options={({ route }) => ({
            title: route.params.item.title,
            headerStyle: {
              backgroundColor: '#101010',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerTitleAlign: 'center',

          })} />
          <Stack.Screen name="Actors" component={ActorsScreen} options={{
            // title: 'My home',
            headerShown: false,

          }} />
          <Stack.Screen name="Search" component={Search} options={({ route }) => ({
            title: route.params.userInput,
            headerStyle: {
              backgroundColor: '#101010',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerTitleAlign: 'center',

          })} />
          <Stack.Screen name="Genre" component={GenreScreen} options={({ route }) => ({
            title: route.params.genre.name,
            headerStyle: {
              backgroundColor: '#101010',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerTitleAlign: 'center',

          })} />
        </Stack.Navigator>
      </View>

    );
  }
}

class App extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              headerTransparent: true, // Make the header transparent
              headerStyle: {
                borderBottomWidth: 0,
                elevation: 0,
              },
              tabBarStyle: {
                backgroundColor: '#101010',
                borderTopWidth: 0.3,
                borderTopColor: '#292a2a',
              },
              tabBarActiveTintColor: '#700',
              tabBarInactiveTintColor: '#888',
            }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
              tabBarIcon: (tabInfo) => (
                <Ionicons name="home" size={28}color={tabInfo.focused ? "#820000" : "#8e8e93"} />),
            }} />
            <Tab.Screen name="Library" component={Lib} options={{
              tabBarIcon: (tabInfo) => (
                <Ionicons name="library" size={28} color={tabInfo.focused ? "#820000" : "#8e8e93"}/>),
            }}/>
          </Tab.Navigator>

        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: '#101010',
  },
});

export default App;
