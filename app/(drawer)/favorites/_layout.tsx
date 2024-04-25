import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useTheme, Text } from 'tamagui';
import { useFavoriteStore } from '~/store';

const Layout = () => {
  const theme = useTheme();
  const { removeAll } = useFavoriteStore();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.blue7.get(),
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'My Favorites',
          headerRight: () => (
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
              onPress={removeAll}>
              <MaterialCommunityIcons color={'#ddd'} size={20} name="delete-outline" />
              <Text color={'#ddd'}>Clear All</Text>
            </TouchableOpacity>
          ),
          headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
        }}
      />
    </Stack>
  );
};
export default Layout;
