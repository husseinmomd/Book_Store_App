import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import Drawer from 'expo-router/drawer';

const Layout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerHideStatusBarOnOpen: false,
        drawerActiveBackgroundColor: colorTokens.dark.blue.blue7,
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: { marginLeft: -20 },
      }}>
      <Drawer.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          drawerIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          title: 'My Favorites',
          headerShown: false,
          drawerIcon: ({ color, size }) => <Feather name="bookmark" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="history"
        options={{
          title: 'Order History',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          drawerIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
};

export default Layout;
