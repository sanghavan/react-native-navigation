import React from 'react';
import { NavigationComponentProps, Options } from 'react-native-navigation';
import Root from '../components/Root';
import Button from '../components/Button';
import Screens from './Screens';
import Navigation from '../services/Navigation';
import { component } from '../commons/Layouts';
import testIDs from '../testIDs';
import { FlatList, Text } from 'react-native';

const {
  PUSH_BTN,
  STACK_SCREEN_HEADER,
  PUSH_LIFECYCLE_BTN,
  POP_NONE_EXISTENT_SCREEN_BTN,
  PUSH_CUSTOM_BACK_BTN,
  PUSH_TITLE_WITH_SUBTITLE,
  PUSH_LAZY_BTN,
  CUSTOM_BACK_BTN,
  SEARCH_BTN,
  SET_STACK_ROOT_BTN,
  SET_STACK_ROOT_WITH_ID_BTN,
  STACK_COMMANDS_BTN,
} = testIDs;

export default class StackScreen extends React.Component<NavigationComponentProps> {
  constructor(props: NavigationComponentProps) {
    super(props);

    for (let i = 0; i < 2000; i++) {
      this._data.push(i.toString());
    }
  }

  static options(): Options {
    return {
      topBar: {
        testID: STACK_SCREEN_HEADER,
        title: {
          text: 'Stack',
        },
      },
    };
  }

  private _data: string[] = [];

  private _renderItem = ({ item }: { item: string }) => {
    return <Text>
      {item}
    </Text>
  }

  render() {
    return (
      <Root componentId={this.props.componentId}>
        <Button label="Push" testID={PUSH_BTN} onPress={this.push} />
        <Button
          label="Push Lifecycle Screen"
          testID={PUSH_LIFECYCLE_BTN}
          onPress={this.pushLifecycleScreen}
        />
        <Button
          label="Pop None Existent Screen"
          testID={POP_NONE_EXISTENT_SCREEN_BTN}
          onPress={this.popNoneExistent}
        />
        <Button
          label="Push Lazily Registered Screen"
          testID={PUSH_LAZY_BTN}
          onPress={this.pushLazilyRegistered}
        />
        <Button
          label="Push Custom Back Button"
          testID={PUSH_CUSTOM_BACK_BTN}
          onPress={this.pushCustomBackButton}
        />
        <Button
          label="Push Title With Subtitle"
          testID={PUSH_TITLE_WITH_SUBTITLE}
          onPress={this.pushTitleWithSubtitle}
        />
        <Button label="Set Stack Root" testID={SET_STACK_ROOT_BTN} onPress={this.setStackRoot} />
        <Button
          label="Set Stack Root With ID"
          testID={SET_STACK_ROOT_WITH_ID_BTN}
          onPress={this.setStackRootWithId}
        />
        <Button label="Search" testID={SEARCH_BTN} onPress={this.search} platform="ios" />
        <Button
          label="Push Stack Commands"
          testID={STACK_COMMANDS_BTN}
          onPress={this.pushStackCommands}
        />
        <FlatList
          style={{flex: 1}}
          data={this._data}
          keyExtractor={item => item}
          renderItem={this._renderItem}
        />
      </Root>
    );
  }

  push = () => Navigation.push(this, Screens.Pushed);

  pushLifecycleScreen = () => Navigation.push(this, Screens.Lifecycle);

  pushLazilyRegistered = () => Navigation.push(this, Screens.LazilyRegisteredScreen);

  popNoneExistent = () => Navigation.pop('noneExistentComponentId');

  pushCustomBackButton = () =>
    Navigation.push(this, {
      component: {
        name: Screens.Pushed,
        options: {
          topBar: {
            backButton: {
              id: 'backPress',
              icon: require('../../img/navicon_add.png'),
              visible: true,
              color: 'black',
              testID: CUSTOM_BACK_BTN,
            },
          },
        },
      },
    });

  pushTitleWithSubtitle = () =>
    Navigation.push(this, {
      component: {
        name: Screens.Pushed,
        options: {
          topBar: {
            title: {
              text: 'Title',
            },
            subtitle: {
              text: 'Subtitle',
            },
          },
        },
      },
    });

  search = () => Navigation.push(this, Screens.Search);

  setStackRoot = () =>
    Navigation.setStackRoot(this, [
      component(Screens.Pushed, { topBar: { title: { text: 'Screen A' } } }),
      component(Screens.Pushed, { topBar: { title: { text: 'Screen B' } } }),
    ]);

  setStackRootWithId = () =>
    Navigation.setStackRoot(this, {
      component: {
        id: 'StackRootWithId',
        name: Screens.Stack,
      },
    });

  pushStackCommands = () => Navigation.push(this, component(Screens.StackCommands));
}
