import { useRouter } from 'expo-router';
import { ScrollView, YStack } from 'tamagui';
import { BookCardLandScape, EmptyList } from '~/components';
import { useFavoriteStore } from '~/store';

const Page = () => {
  const { items } = useFavoriteStore();
  const router = useRouter();

  return (
    <YStack pt={10} backgroundColor={'#fff'} flex={1}>
      {items.length === 0 ? (
        <EmptyList
          title="Your Favorites"
          subTitle="There are no favorites yet. Start bookmarking some products"
          imageSource={require('../../../assets/document.png')}
          hasButton
          buttonTitle="Browse Books"
          handelNavigation={() => router.navigate('/(drawer)/home')}
        />
      ) : (
        <YStack flex={1} alignItems="center">
          <ScrollView showsVerticalScrollIndicator={false}>
            {items.map((book) => (
              <BookCardLandScape key={book._id} book={book} />
            ))}
          </ScrollView>
        </YStack>
      )}
    </YStack>
  );
};

export default Page;
