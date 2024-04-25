import { Link, useRouter } from 'expo-router';
import { Button, Image, SizableText, Text, Theme, View, YStack } from 'tamagui';

const Page = () => {
  const router = useRouter();
  return (
    <YStack pt={10} flex={1} justifyContent="center" px={10} backgroundColor={'#fff'}>
      <YStack px={40} justifyContent="center" alignItems="center">
        <SizableText fontFamily="$body" fontWeight={'bold'} size={'$6'} color={'#000'}>
          Order Confirmed !
        </SizableText>
        <View alignSelf="center" mt={30} height={60} width={60}>
          <Image
            style={{
              width: '100%',
              height: '100%',
            }}
            source={require('../assets/check.png')}
          />
        </View>
        <Text mt={30} fontWeight={'200'} textAlign="center">
          Your order has been placed successfully.{' '}
          <Link href={'/(drawer)/history/'}>
            <Text color={'green'} fontWeight={'bold'}>
              Order History
            </Text>
          </Link>
        </Text>
        <Theme name={'green'}>
          <Button onPress={() => router.navigate('/(drawer)/home')} size={'$4'} elevate mt={30}>
            Continue Shopping
          </Button>
        </Theme>
      </YStack>
    </YStack>
  );
};

export default Page;
