import { Link, useRouter } from 'expo-router';
import { Book } from '~/types';
import { Image } from 'expo-image';
import { Card, Text, View, Separator, XStack, YStack, Avatar } from 'tamagui';
import { AlertType, useAppStore, useBookStore, useCartStore, useFavoriteStore } from '~/store';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Subtitle } from '~/tamagui.config';
import { colorTokens } from '@tamagui/themes';

interface BookCard {
  book: Book;
}
export function BookCard({ book }: BookCard) {
  const { setBook } = useBookStore();

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <Link asChild onPress={() => setBook(book)} href={`/(drawer)/home/book/${book._id}`}>
      <Card
        my={15}
        p={0}
        width={140}
        height={200}
        scale={0.5}
        borderRadius={'$7'}
        overflow="hidden"
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.975 }}
        animation={'bouncy'}>
        <Image
          contentFit="cover"
          source={{
            uri: book.images[0].url,
          }}
          placeholder={blurhash}
          alt={'book'}
          style={{ width: '100%', height: '100%' }}
        />
      </Card>
    </Link>
  );
}

export function BookCardList({ book }: BookCard) {
  const { setBook } = useBookStore();

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <Link
      onPress={() => setBook(book)}
      key={book._id}
      asChild
      href={`/(drawer)/home/book/${book._id}`}>
      <Card
        width={100}
        height={150}
        mx={10}
        scale={0.5}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.975 }}
        animation={'bouncy'}>
        <Image
          contentFit="cover"
          source={{
            uri: book.images[0].url,
          }}
          placeholder={blurhash}
          alt={'book'}
          style={{ width: '100%', height: '100%' }}
        />
      </Card>
    </Link>
  );
}

interface BookCardLandScapeProps {
  book: Book;
}
export function BookCardLandScape({ book }: BookCardLandScapeProps) {
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const { isItemInCart, addItem } = useCartStore();
  const { setBook, setBookId } = useBookStore();
  const { setSnackBarValue } = useAppStore();

  const router = useRouter();
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <Pressable
      onPress={() => {
        setBook(book);
        router.push(`/(drawer)/home/book/${book?._id}`);
      }}>
      <View>
        <View flexDirection="row" justifyContent="space-between" p={2}>
          <View justifyContent="space-between" flexDirection="row">
            <Card
              hoverStyle={{ scale: 0.925 }}
              pressStyle={{ scale: 0.975 }}
              borderRadius={'$7'}
              overflow="hidden"
              width={90}
              height={140}>
              <Image
                source={{
                  uri: book.images[0].url,
                }}
                placeholder={blurhash}
                alt={'book'}
                style={{ width: '100%', height: '100%' }}
              />
            </Card>
            <View gap={3} pl={12}>
              <Text width={220} fontWeight={'700'} fontSize={'$7'}>
                {book.title}
              </Text>
              <Text fontSize={'$3'} color={'#444'}>
                by {book.author}
              </Text>
              <Text fontSize={'$3'} color={'#444'}>
                ({book.categories ? book?.categories![0].name : 'No Category'})
              </Text>

              {book.quantity >= 3 && <Text fontSize={'$1'}>Many In Stock</Text>}
              <Text fontSize={'$3'} fontWeight={'bold'} color={'#444'}>
                ${book.price}
              </Text>
            </View>
          </View>
          <YStack justifyContent="space-between">
            <TouchableOpacity
              onPress={() => {
                toggleFavorite(book, book._id);
                setBookId(book._id);
                setSnackBarValue(true, AlertType.Bookmark);
              }}>
              <Ionicons
                name={isFavorite(book._id) ? 'bookmark' : 'bookmark-outline'}
                style={{ marginTop: 6 }}
                color={isFavorite(book._id) ? colorTokens.dark.blue.blue7 : 'grey'}
                size={22}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                addItem(book, 1);
                setBookId(book._id);
                setSnackBarValue(true, AlertType.Cart);
              }}>
              <Ionicons
                name={isItemInCart(book._id) ? 'cart' : 'cart-outline'}
                style={{ marginTop: 6 }}
                color={isItemInCart(book._id) ? colorTokens.dark.blue.blue7 : 'grey'}
                size={22}
              />
            </TouchableOpacity>
          </YStack>
        </View>
        <Separator
          alignSelf="stretch"
          width={'100%'}
          borderColor={'#ddd'}
          marginVertical={10}
          borderWidth={0.3}
        />
      </View>
    </Pressable>
  );
}

interface CartCardProps {
  book: Book;
}
export function CartCard({ book }: CartCardProps) {
  const { removeItem, increaseQuantity, decreaseQuantity, items } = useCartStore();

  const getQtyForBook = (book: Book): number => {
    const cartItem = items.find((item) => item.book?._id === book?._id);
    return cartItem ? cartItem.qty : 0;
  };

  return (
    <YStack paddingTop={10}>
      <XStack alignItems="center" justifyContent="space-between">
        <View flexDirection="row">
          <Avatar overflow="hidden" size="$8">
            <Avatar.Image
              style={{ objectFit: 'cover' }}
              accessibilityLabel="Book Cover"
              src={book.images[0].url}
            />
            <Avatar.Fallback backgroundColor="$blue7" />
          </Avatar>
          <View flexDirection="row" justifyContent="space-between">
            <View gap={3} pl={8}>
              <Text width={180} fontSize={'$4'}>
                {book.title}{' '}
                <Subtitle color={'grey'} size={'$3'}>
                  x{getQtyForBook(book)}
                </Subtitle>
              </Text>
              <XStack gap={4}>
                <Text fontSize={'$2'} color={'#444'}>
                  ({book.categories && book.categories[0].name})
                </Text>
                <Text fontSize={'$2'} color={'#444'}>
                  ({book.language.name})
                </Text>
              </XStack>
              <Text fontSize={'$3'} fontWeight={'bold'} color={'#444'}>
                ${book.price}
              </Text>
            </View>
          </View>
        </View>
        <YStack alignItems="center" gap={12}>
          <XStack space={'$4'}>
            <TouchableOpacity onPress={() => increaseQuantity(book._id)} style={styles.qtyButton}>
              <Feather name="plus" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => decreaseQuantity(book._id)} style={styles.qtyButton}>
              <Feather name="minus" />
            </TouchableOpacity>
          </XStack>
          <MaterialCommunityIcons
            onPress={() => removeItem(book._id)}
            name="delete-outline"
            color={'#c85050'}
            size={25}
          />
        </YStack>
      </XStack>
      <Separator
        alignSelf="stretch"
        borderColor={'#ddd'}
        marginHorizontal={10}
        marginVertical={14}
        borderWidth={0.3}
      />
    </YStack>
  );
}

const styles = StyleSheet.create({
  qtyButton: {
    backgroundColor: '#ddd',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 30,
  },
});
