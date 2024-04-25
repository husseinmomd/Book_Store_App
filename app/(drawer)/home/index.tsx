import { AlertType, useAppStore, useBookStore, useCartStore, useFavoriteStore } from '~/store';
import { BookCard, BookCardLandScape, CustomSnackbar, EmptyList } from '~/components';
import { ScrollView, SizableText, Spinner, XStack, YStack } from 'tamagui';
import { FunctionComponent, useEffect, useState } from 'react';
import { BookServices } from '~/services';
import { Book } from '~/types';
import { router } from 'expo-router';

const LoadingSection: FunctionComponent = () => <Spinner py={14} size="large" />;

const Page = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const { bookId } = useBookStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { snackBarValue, setSnackBarValue, alertType } = useAppStore();
  const { isFavorite } = useFavoriteStore();
  const { isItemInCart } = useCartStore();

  const hideSnackbar = () => {
    setSnackBarValue(false, null);
  };

  const getSnackbarMessage = (id: string) => {
    if (alertType === AlertType.Bookmark) {
      return !isFavorite(id) ? 'Removed from Bookmark' : 'Added book to Bookmark';
    } else {
      return !isItemInCart(id) ? 'Removed from Cart' : 'Added book to Cart';
    }
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const books = await new BookServices().getAll();
      setBooks(books);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <YStack flex={1} backgroundColor={'#fff'} pt={10} px={10}>
      {!isLoading && books.length < 0 ? (
        <EmptyList
          title="Ops!"
          subTitle="There are no products yet"
          imageSource={require('../../../assets/empty-folder.png')}
        />
      ) : (
        <>
          <SizableText fontFamily="$body" size={'$7'} color={'#000'}>
            Featured
          </SizableText>
          {isLoading ? (
            <LoadingSection />
          ) : (
            <XStack p={0}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 14 }}>
                {books.map((book) => (
                  <BookCard key={book?._id} book={book} />
                ))}
              </ScrollView>
            </XStack>
          )}
          <XStack my={10} justifyContent="space-between">
            <SizableText fontFamily="$body" size={'$4'} color={'#222'}>
              You Might Like
            </SizableText>
            <SizableText
              onPress={() => router.push('/home/list/')}
              fontFamily="$body"
              size={'$4'}
              color={'#222'}>
              View All
            </SizableText>
          </XStack>
          <YStack flex={1}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {books?.map((book) => {
                return <BookCardLandScape key={book?._id} book={book} />;
              })}
            </ScrollView>
            <CustomSnackbar
              visible={snackBarValue}
              onDismiss={hideSnackbar}
              message={getSnackbarMessage(bookId)}
            />
          </YStack>
        </>
      )}
    </YStack>
  );
};

export default Page;
