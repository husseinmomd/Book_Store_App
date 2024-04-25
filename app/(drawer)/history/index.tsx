import { useRouter } from 'expo-router';
import { YStack, SizableText, ScrollView } from 'tamagui';
import { EmptyList, OrderHistoryCard } from '~/components';
import { useHistoryStore } from '~/store';

const Page = () => {
  const { items } = useHistoryStore();
  const router = useRouter();
  return (
    <YStack flex={1} backgroundColor={'#fff'} pt={10} px={10}>
      {items.length !== 0 ? (
        <>
          <SizableText fontFamily="$body" size={'$7'} color={'#000'}>
            Order History
          </SizableText>
          <ScrollView>
            {items.map((item) => (
              <OrderHistoryCard key={item._id} order={item} />
            ))}
          </ScrollView>
        </>
      ) : (
        <EmptyList
          title="Your Orders"
          subTitle="There are no order history yet. Start purchase some products"
          buttonTitle="Browse Products"
          handelNavigation={() => router.navigate('/(drawer)/home')}
          imageSource={require('../../../assets/shopping-bag.png')}
          hasButton
        />
      )}
    </YStack>
  );
};

export default Page;
