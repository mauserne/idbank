import React, { Component } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Button, Footer, FooterTab, Content, List, ListItem, Icon, Left, Body, Right, Toast, Root  } from 'native-base';
import Dialog from "react-native-dialog";
import { BlurView } from 'expo-blur';

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      {/* <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      /> */}
      <Button block iconRight onPress={() => navigation.navigate('Profile')}>
            <Text>"Go to Profile"</Text>
      </Button>
    </View>
  );
}

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: 'stretch' }}>
      {/* <Button title="sake" onPress={() => navigation.navigate('Sake')} />
      <Button title="Go back" onPress={() => navigation.goBack()} /> */}

      <Button style={{ margin: 25 }} onPress={() => navigation.navigate('Sake')}>
            <Text>sake</Text>
      </Button>
      <Button style={{ margin: 25 }} onPress={() => navigation.navigate('Sake')}>
            <Text>sake</Text>
      </Button>
      <Button style={{ margin: 25 }} block warning onPress={() => navigation.goBack()}>
            <Text>"Go back"</Text>
      </Button>
      <Content style={{ backgroundColor: 'white' }}>
          <List>
            <ListItem button onPress={()=> Toast.show({
              text: 'Wrong password!',
              buttonText: 'Okay'
            })}>
              <Body>
                <Text>Simon Mignolet</Text>
              </Body>
              <Right>
              <Icon active name="arrow-forward" />
            </Right>
            </ListItem>
            <ListItem iconRight>
              <Text>Nathaniel Clyne</Text>
              <Icon name='arrow-forward' />
            </ListItem>
            <ListItem iconRight>
              <Text>Dejan Lovren</Text>
              <Icon name='arrow-forward' />
            </ListItem>
          </List>
      </Content>
    </View>
  );
}

function Sake({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>nomimasu</Text>
      <Button style={{ margin: 50 }} rounded warning onPress={() => navigation.goBack()}>
            <Text>"Go back"</Text>
      </Button>
      <Button style={{ margin: 50 }} rounded danger onPress={() => navigation.navigate('mom')}>
            <Text>"Go back to mom"</Text>
      </Button>
    </View>
  );
}

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="홈스크린"
        component={Home}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Sake"
        component={Sake}
        options={{ headerStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  );
}

export default class App extends Component {
  state = {
    dialogVisible: false
  };
 
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

  render() {
    return (
    <Root>
    <NavigationContainer>
      <MyStack />
      <View>
        <TouchableOpacity onPress={this.showDialog}>
          <Text>Show Dialog</Text>
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogVisible} 
        blurComponentIOS={blurComponentIOS}
        >
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Description>
            Do you want to delete this account? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button bold color='red' label="Delete" onPress={this.handleDelete} />
        </Dialog.Container>
      </View>
      <Footer>
          <FooterTab>
            <Button full>
              <Text>AD</Text>
            </Button>
          </FooterTab>
        </Footer>
    </NavigationContainer>
    </Root>
  );
}
}



const blurComponentIOS = (
  <BlurView
    style={StyleSheet.absoluteFill}
    tint ="light"
    intensity ={90}
  />
)