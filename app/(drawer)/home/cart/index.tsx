import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Button,
  H3,
  ScrollView,
  Spinner,
  Text,
  YStack,
  Separator,
  XStack,
  View,
  SizableText,
} from 'tamagui';
import { CartCard, EmptyList } from '~/components';
import { useCartStore } from '~/store';
import { useOrderStore } from '~/store';
import { Book } from '~/types';

const Page = () => {
  const router = useRouter();
  const { items } = useCartStore();
  const { setTotalSum } = useOrderStore();
  const [isLoading] = useState(false);

  const calculateTotalCost = (item: { book: Book; qty: number }) => {
    const { book, qty } = item;
    const bookPrice = book.price; // Convert the price to a numeric value
    return bookPrice * qty;
  };

  const totalCostPerBook = items.map(calculateTotalCost);
  const totalSum = totalCostPerBook.reduce((sum, cost) => sum + cost, 0);

  return (
    <YStack pt={10} flex={1} px={10} backgroundColor={'#fff'}>
      {items.length === 0 ? (
        <EmptyList
          title="Your Cart"
          subTitle="There are no cart items yet. Start adding some products"
          imageSource={require('../../../../assets/empty-cart (2).png')}
          hasButton
          buttonTitle="Browse Items"
          handelNavigation={() => router.navigate('/(drawer)/home/')}
        />
      ) : (
        <>
          <SizableText fontFamily="$body" size={'$5'} color={'#000'}>
            All Items ({items.length})
          </SizableText>
          <ScrollView showsVerticalScrollIndicator={false}>
            {isLoading ? (
              <Spinner />
            ) : (
              items.map((item) => <CartCard key={item?.book?._id} book={item?.book} />)
            )}
          </ScrollView>
          <YStack
            borderTopLeftRadius={items.length > 0 ? 18 : 0}
            borderTopRightRadius={items.length > 0 ? 18 : 0}
            backgroundColor={items.length > 0 ? '#f1f1f1' : '#fff'}>
            {items && items.length > 0 && (
              <View p={10}>
                <H3
                  size={6}
                  enterStyle={{
                    opacity: 0,
                  }}
                  color={'#000'}
                  animation={'lazy'}>
                  Order Summary
                </H3>
                <Separator
                  alignSelf="stretch"
                  width={'100%'}
                  borderColor={'#ccc'}
                  marginVertical={10}
                  borderWidth={0.3}
                />
                <XStack alignItems="center" justifyContent="space-between">
                  <Text
                    enterStyle={{
                      opacity: 0,
                    }}
                    color={'#000'}
                    animation={'lazy'}>
                    Order Total
                  </Text>
                  <Text
                    my={6}
                    enterStyle={{
                      opacity: 0,
                    }}
                    color={'#000'}
                    animation={'lazy'}>
                    $ {totalSum.toFixed(2)}
                  </Text>
                </XStack>
              </View>
            )}
            <Button
              onPress={() => {
                if (totalSum === 0) return;
                setTotalSum(parseFloat(totalSum.toFixed(2)));
                router.push(`/home/order/`);
              }}
              color={items.length > 0 ? '#fff' : 'grey'}
              size={'$5'}
              disabled={items.length === 0}
              elevate
              m={30}>
              Checkout
            </Button>
          </YStack>
        </>
      )}
    </YStack>
  );
};

export default Page;
