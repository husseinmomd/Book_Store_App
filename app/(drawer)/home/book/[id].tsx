import { router, Stack, useLocalSearchParams } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useBookStore, useCartStore, useFavoriteStore } from '~/store';
import { Button, Paragraph, ScrollView, YStack, Text, H2, XStack } from 'tamagui';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground, Image } from 'expo-image';
import { Container } from '~/tamagui.config';
import { useState } from 'react';
import { CustomSnackbar } from '~/components';
import { Book } from '~/types';

const Page = () => {
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const { id } = useLocalSearchParams<{ id: string }>();
  const { book } = useBookStore();
  const { addItem, items, isItemInCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoriteStore();

  function getQtyForBook(book: Book): number {
    const cartItem = items.find((item) => item.book._id === book._id);
    return cartItem ? cartItem.qty : 0;
  }

  // snackbar values
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [outOfStockAlert, setOutOfStockAlert] = useState(false);

  const showSnackbar = () => {
    setSnackbarVisible(true);
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };

  const getSnackbarMessage = () => {
    return !isFavorite(id) ? 'Removed from Bookmark' : 'Added book to Bookmark';
  };

  return (
    <Container backgroundColor={'#fff'}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              unstyled
              onPress={() => {
                toggleFavorite(book!, id);
                showSnackbar();
              }}
              scale={0.95}
              hoverStyle={{ scale: 0.925 }}
              pressStyle={{ scale: 0.975 }}
              animation={'bouncy'}>
              <Ionicons
                name={isFavorite(id) ? 'bookmark' : 'bookmark-outline'}
                size={26}
                color={'#444'}
              />
            </Button>
          ),
        }}
      />

      <ImageBackground
        placeholder={blurhash}
        style={{
          height: 350,
          borderBottomLeftRadius: 15,
          paddingHorizontal: 5,
          borderBottomRightRadius: 15,
          overflow: 'hidden',
        }}
        source={{
          uri: book?.images[0].url,
          isAnimated: true,
        }}>
        <Image
          placeholder={blurhash}
          source={{
            uri: book?.images[0].url,
          }}
          style={{ width: 205, height: 320, margin: 10, borderRadius: 6 }}
        />
      </ImageBackground>
      <ScrollView>
        <YStack
          p={10}
          animation={'lazy'}
          enterStyle={{
            opacity: 0,
            y: 10,
          }}>
          <H2 textAlign={book?.language.name === 'Arabic' ? 'right' : 'left'} color={'$blue7'}>
            {book?.title}{' '}
            <Text fontSize={14}>
              ({book?.categories ? book?.categories[0].name : 'No Category'})
            </Text>
          </H2>
          <Paragraph fontSize={'$3'} color={'$blue7'}>
            by {book?.author}
          </Paragraph>
          <Text fontWeight={'bold'}>${book?.price}</Text>
          <Text
            textAlign={book?.language.name === 'Arabic' ? 'right' : 'left'}
            mt={5}
            fontSize={13}>
            {book?.description}
          </Text>
        </YStack>
      </ScrollView>
      <Button
        animation={'lazy'}
        enterStyle={{
          opacity: 0,
          y: 10,
        }}
        m={30}
        icon={
          <MaterialCommunityIcons
            name={isItemInCart(book?._id!) ? 'delete-outline' : 'cart-outline'}
            size={20}
          />
        }
        size={'$5'}
        elevate
        onPress={() => addItem(book!, 1)}>
        {isItemInCart(book?._id!) ? 'Remove from Cart' : 'Add To Cart'}
      </Button>

      {/* only show when book is in cart */}
      {items && isItemInCart(book?._id!) && (
        <XStack
          animation={'lazy'}
          enterStyle={{
            opacity: 0,
            y: 10,
          }}
          justifyContent="space-between"
          mx={20}
          mb={35}
          alignItems="center">
          <Text fontSize={17} fontWeight={'bold'}>
            ${(book?.price! * getQtyForBook(book!)).toFixed(1)}
          </Text>
          {/* buttons start */}
          <XStack
            borderColor={'$blue1'}
            borderWidth={0.6}
            px={25}
            py={5}
            backgroundColor={'$colorTransparent'}
            alignItems="center"
            space={'$4'}>
            <TouchableOpacity onPress={() => decreaseQuantity(book?._id!)}>
              <Text fontSize={20}>-</Text>
            </TouchableOpacity>
            <Text fontSize={20} fontWeight={'bold'}>
              {getQtyForBook(book!)}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (book?.quantity! < getQtyForBook(book!)) {
                  setOutOfStockAlert(true);

                  return;
                }

                increaseQuantity(book?._id!);
              }}>
              <Text fontSize={20}>+</Text>
            </TouchableOpacity>
          </XStack>
          <Button
            onPress={() => router.push('/home/cart/')}
            icon={<MaterialCommunityIcons size={18} name="cart-outline" />}
          />
        </XStack>
      )}
      {/* only show when book is in cart */}

      {/* cart and bookmark snackbar */}
      <CustomSnackbar
        visible={snackbarVisible}
        onDismiss={hideSnackbar}
        message={getSnackbarMessage()}
      />
      {/* out of stock snackbar */}
      <CustomSnackbar
        visible={outOfStockAlert}
        onDismiss={() => setOutOfStockAlert(false)}
        message={'Out of stock!'}
      />
    </Container>
  );
};

export default Page;
