import { DrawerToggleButton } from '@react-navigation/drawer';
import { Link, Stack, useRouter } from 'expo-router';
import { View, useTheme, Text, Button } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useAppStore, useCartStore } from '~/store';

const Layout = () => {
  const theme = useTheme();
  const router = useRouter();
  const { removeAll, items: cartItems } = useCartStore();
  const isEmpty = cartItems.length === 0;

  const { setBottomSheetValue } = useAppStore();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: theme.blue7.get(),
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: '',
          headerLeft: () => <DrawerToggleButton tintColor={theme.blue7.get()} />,
          headerRight: () => (
            <View flexDirection="row" gap={8} pr={6}>
              <TouchableOpacity onPress={() => router.push('/home/search/')}>
                <Feather
                  style={{ paddingRight: 6 }}
                  name="search"
                  size={19}
                  color={theme.blue7.get()}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 4,
                }}
                onPress={() => router.push('/home/cart/')}>
                <Feather name="shopping-cart" size={19} color={theme.blue7.get()} />
                <Text color={'#000'} fontWeight={'bold'}>
                  {cartItems.length}
                </Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="list"
        options={{
          title: '',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="book/[id]"
        options={{
          title: '',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="order"
        options={{
          title: 'Order',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: 'Search Books',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          headerBackTitle: 'Back',
          title: 'Check Out',
          headerRight: () => (
            <TouchableOpacity
              disabled={isEmpty}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
              onPress={removeAll}>
              <MaterialCommunityIcons
                color={isEmpty ? '#a0a0a0' : '#555'}
                size={20}
                name="delete-outline"
              />
              <Text color={isEmpty ? '#a0a0a0' : '#555'}>Clear All</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};
export default Layout;
