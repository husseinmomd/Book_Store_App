import { Stack } from 'expo-router';
import { useTheme, Text } from 'tamagui';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useHistoryStore } from '~/store';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Layout() {
  const theme = useTheme();
  const { selectedItem, removeAll, items } = useHistoryStore();
  const isEmpty = items.length === 0;
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerRight: () => (
            <TouchableOpacity
              disabled={isEmpty}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
              onPress={removeAll}>
              <MaterialCommunityIcons
                color={isEmpty ? '#ddd' : '#fff'}
                size={20}
                name="delete-outline"
              />
              <Text color={isEmpty ? '#ddd' : '#fff'}>Clear All</Text>
            </TouchableOpacity>
          ),

          title: 'Order History',
          headerStyle: {
            backgroundColor: theme.blue7.get(),
          },
          headerTintColor: '#fff',
          headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
        }}
      />
      <Stack.Screen
        name="detail/[id]"
        options={{
          presentation: 'modal',
          headerTitle: selectedItem?._id,
          headerBackTitle: 'back',
        }}
      />
    </Stack>
  );
}
