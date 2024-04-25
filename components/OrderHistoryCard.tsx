import { Feather } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import { useRouter } from 'expo-router';
import { Paragraph, SizableText, Text, XStack, YStack } from 'tamagui';
import { HistoryItem } from '~/store';
import { Container } from '~/tamagui.config';
import { setInputDate } from '~/utils';

interface OrderHistoryCardProps {
  order: HistoryItem;
}
export function OrderHistoryCard({ order }: OrderHistoryCardProps) {
  const router = useRouter();

  const itemsInFigures = order.orderItems.map((item) => item.book.title).join(', ');

  return (
    <Container
      onPress={() => router.push(`/history/detail/${order._id}`)}
      elevation={30}
      p={10}
      borderWidth={1}
      borderRadius={8}
      gap={7}
      borderColor={'#ddd'}
      m={7}>
      <YStack>
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontWeight={'bold'} color={colorTokens.dark.blue.blue7}>
            #{order._id}
          </Text>
          {order.currencyType === 'USD' ? (
            <Text fontWeight={'600'} color={'#000'}>
              ${order.totalPrice}
            </Text>
          ) : (
            <Text fontWeight={'600'} color={'#000'}>
              SLSH {order.totalPrice}
            </Text>
          )}
        </XStack>
        <SizableText fontSize={12} color={'#444'}>
          {setInputDate(order.orderDate.toString())}
        </SizableText>
      </YStack>
      <Text fontWeight={'400'}>{order.orderItems.length} items</Text>
      <Paragraph color={'#000'}>{itemsInFigures}</Paragraph>
      <XStack alignItems="flex-start" space={'$2'}>
        <Feather name="user" size={16} />
        <YStack>
          <Text fontSize={12} color={'#333'}>
            {order.fullName}
          </Text>
          <Text>Buyer</Text>
        </YStack>
      </XStack>
    </Container>
  );
}
