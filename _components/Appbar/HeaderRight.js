import * as React from 'react';
import {
  Appbar,
  Menu,
  Divider,
  IconButton,
  List,
  Switch,
  Text,
  Colors,
} from 'react-native-paper';
import { View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { stylesActions } from '../../_actions';

const HeaderRight = ({ theme, fontsize }) => {
  
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const dispatch = useDispatch();

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="cog" color={"#ffffff"} onPress={openMenu}/>}
      style={{ minWidth: 'auto' }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <List.Icon icon="weather-night" />
        <Text style={{ marginRight: 12 }}>{'Темная тема'}</Text>
        <Switch
          color={Colors.red500}
          style={{ marginRight: 12 }}
          value={theme !== undefined && theme === 'dark'}
          onValueChange={(val) =>
            dispatch(stylesActions.setTheme(val === true ? 'dark' : 'default'))
          }
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <IconButton
          icon="minus"
          color={Colors.red500}
          size={20}
          disabled={fontsize === '8'}
          onPress={() => dispatch(stylesActions.setFontSize(String(Number(fontsize) - 1)))}
        />
        <Text style={{ marginRight: 12 }}>{`Шрифт: ${fontsize}`}</Text>
        <IconButton
          icon="plus"
          color={Colors.red500}
          size={20}
          disabled={fontsize === '32'}
          onPress={() => dispatch(stylesActions.setFontSize(String(Number(fontsize) + 1)))}
        />
      </View>
    </Menu>
  );
};
function mapStateToProps(state) {
  const { theme, fontsize } = state.style;
  return {
    theme,
    fontsize,
  };
}

const connectedHeaderRight = connect(mapStateToProps)(HeaderRight);
export { connectedHeaderRight as HeaderRight };
