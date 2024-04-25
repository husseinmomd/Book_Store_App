import { useEffect, useId, useState } from 'react';
import {
  Separator,
  SizableText,
  XStack,
  YStack,
  Text,
  Input,
  Form,
  Label,
  ScrollView,
  Button,
  Spinner,
} from 'tamagui';
import { Config as Configuration, Order, OrderItem } from '~/types';
import { useAppStore, useCartStore, useHistoryStore, useOrderStore } from '~/store';
import RNPickerSelect from 'react-native-picker-select';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { Endpoints } from '~/api';
import { ConfigServices } from '~/services/config.service';
import { useRouter } from 'expo-router';
import { CustomSnackbar } from '~/components';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Config } from '~/config';

function IconProvider() {
  return <Feather name="chevron-down" />;
}
export type SendResponse = {
  code: string;
  sid: string;
  response: string;
};

const methods = ['zaad', 'edahab'] as const;
const delivery = ['Delivery', 'Pickup'] as const;
const currency = ['USD', 'SLSH'] as const;

const schema = z.object({
  fullName: z.string(),
  phoneNumber: z.string(),
  address: z.string().optional(),
  paymentMethod: z.enum(methods),
  deliveryOption: z.enum(delivery),
  currencyType: z.enum(currency),
});

type FormValues = z.infer<typeof schema>;

const Page = () => {
  const router = useRouter();
  const { totalSum } = useOrderStore();
  const [config, setConfig] = useState<Configuration | undefined>(undefined);
  const [totalInSShilling, setTotalInShilling] = useState<number>(0);
  const [totalInUSD, setTotalInUSD] = useState<number>(() => totalSum);
  const { items: cartItems, removeAll: clearCart } = useCartStore();
  const { snackBarValue, setSnackBarValue } = useAppStore();
  const { addItem } = useHistoryStore();
  const [loading, setLoading] = useState(false);

  const hideSnackbar = () => {
    setSnackBarValue(false, null);
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const inputId = useId();

  const handleDeliveryOptionChange = (value: 'Delivery' | 'Pickup') => {
    if (value === 'Pickup') {
      setTotalInUSD((prev) => prev - 1);
      setTotalInShilling((prev) => prev - (config ? config.exchangeRate : 0));
    } else if (value === 'Delivery') {
      setTotalInUSD((prev) => prev + 1);
      setTotalInShilling((prev) => prev - (config ? config.exchangeRate : 0));
    }
    setValue('deliveryOption', value);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('data', data);
    let orderItems: OrderItem[] = cartItems.map((item) => {
      return {
        book: item.book,
        qty: item.qty,
      };
    });
    let order: Order = {
      orderItems,
      address: data.address ?? 'Optional',
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      deliveryOption: data.deliveryOption,
      paymentMethod: data.paymentMethod,
      currencyType: data.currencyType,
      totalPrice: data.currencyType === 'USD' ? totalInUSD : totalInSShilling,
      orderDate: new Date().toISOString(),
    };
    try {
      const res = await axios.post<SendResponse>(Config.VERCEL_URL + Endpoints.Send, {
        amount: order.totalPrice,
        gateway: order.paymentMethod,
        account: order.phoneNumber,
        currency: order.currencyType,
      });
      switch (res.data.code) {
        case '601':
          setSnackBarValue(true, null);
          try {
            const res = await axios.post(Config.VERCEL_URL + Endpoints.Checkout, { order });
            console.log(res);
            // save order to local db
            addItem({
              ...order,
              _id: Math.floor(Math.random() * 2001290129).toString(),
              orderDate: new Date(),
            });

            clearCart();
            // navigate to payment success screen
            router.navigate('/success');
          } catch (error) {
            console.log(error);
          }
          break;
        case '602':
          // log failed payment
          router.navigate('/failed');
          return;
        case '603':
          // log failed payment
          router.navigate('/failed');
          return;
      }
    } catch (error) {
      console.log(error);
      // navigate to failed payment screen
      router.navigate('/failed');
    }
  };

  const paymentMethodOptions = [
    { label: 'Zaad', value: 'zaad' },
    { label: 'Edahab', value: 'edahab' },
  ];
  const deliveryOptions = [
    { label: 'Pickup', value: 'Pickup' },
    { label: 'Delivery + $1', value: 'Delivery' },
  ];
  const currencyOptions = [
    { label: 'USD', value: 'USD' },
    { label: 'SLSH', value: 'SLSH' },
  ];

  async function getConfig() {
    const config = await new ConfigServices().getAll();
    console.log(config);
    setConfig(config);
    setTotalInShilling(totalSum * config.exchangeRate);
  }

  useEffect(() => {
    getConfig();
  }, [totalSum]);

  return (
    <YStack flex={1} backgroundColor={'#fff'} pt={10} px={10}>
      <SizableText fontFamily="$body" size={'$7'} color={'#000'}>
        Order Summary
      </SizableText>
      <XStack alignItems="center" justifyContent="space-between">
        <Text
          enterStyle={{
            opacity: 0,
          }}
          color={'#000'}
          animation={'lazy'}>
          Total Amount
        </Text>
        <Text
          my={6}
          enterStyle={{
            opacity: 0,
          }}
          color={'#000'}
          animation={'lazy'}>
          ${totalSum}
        </Text>
      </XStack>
      <Separator
        alignSelf="stretch"
        width={'100%'}
        borderColor={'#ccc'}
        marginVertical={10}
        borderWidth={0.3}
        mt={30}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Form onSubmit={handleSubmit(onSubmit)} flex={1} px={6} gap={12}>
          <YStack gap={7}>
            <Label color={'#222'} htmlFor={`${inputId}-full-name`}>
              Full Name
            </Label>
            <Controller
              rules={{ required: true }}
              control={control}
              name="fullName"
              render={({ field }) => (
                <Input
                  {...field}
                  disabled={isSubmitting}
                  backgroundColor={'#f0f0f0'}
                  borderColor={'#ddd'}
                  placeholderTextColor={'#888'}
                  size={'$4'}
                  id={`${inputId}-full-name`}
                  keyboardType="default"
                  outlineWidth={0}
                  onBlur={field.onBlur}
                  color={'#222'}
                  outlineStyle="hidden"
                  onChangeText={field.onChange}
                  value={field.value}
                />
              )}
            />
          </YStack>
          <YStack gap={7}>
            <Label color={'#222'} htmlFor={`${inputId}-phone-number`}>
              Phone Number
            </Label>
            <Controller
              control={control}
              rules={{ required: true }}
              name="phoneNumber"
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  disabled={loading}
                  id={`${inputId}-phone-number`}
                  backgroundColor={'#f0f0f0'}
                  borderColor={'#ddd'}
                  placeholderTextColor={'#888'}
                  placeholder="063xx / 065xx"
                  size={'$4'}
                  color={'#222'}
                  keyboardType="number-pad"
                  outlineWidth={0}
                  onBlur={onBlur}
                  outlineStyle="hidden"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </YStack>
          <YStack gap={7}>
            <Label color={'#222'} htmlFor={`${inputId}-address`}>
              Address
            </Label>
            <Controller
              control={control}
              rules={{ required: false }}
              name="address"
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  disabled={loading}
                  id={`${inputId}-address`}
                  backgroundColor={'#f0f0f0'}
                  borderColor={'#ddd'}
                  placeholder="Optional"
                  color={'#222'}
                  placeholderTextColor={'#888'}
                  size={'$4'}
                  onBlur={onBlur}
                  keyboardType="default"
                  outlineWidth={0}
                  value={value}
                  onChangeText={onChange}
                  outlineStyle="hidden"
                />
              )}
            />
          </YStack>
          <YStack gap={7}>
            <Label color={'#222'} id={`${inputId}-currency-type`}>
              Currency Type
            </Label>
            <Controller
              control={control}
              rules={{ required: true }}
              name="currencyType"
              render={({ field: { value, onChange } }) => (
                <RNPickerSelect
                  disabled={loading}
                  placeholder={undefined}
                  style={{
                    viewContainer: {
                      justifyContent: 'space-between',
                      borderColor: '#ddd',
                      paddingVertical: 16,
                      paddingHorizontal: 10,
                      borderRadius: 8,
                      borderWidth: 1,
                      backgroundColor: '#f0f0f0',
                    },
                    placeholder: {
                      color: '#888',
                    },
                  }}
                  value={value}
                  Icon={IconProvider}
                  onValueChange={onChange}
                  items={currencyOptions}
                />
              )}
            />
          </YStack>
          <YStack gap={7}>
            <Label color={'#222'} htmlFor={`${inputId}-payment-method`}>
              Payment Method
            </Label>
            <Controller
              control={control}
              rules={{ required: true }}
              name="paymentMethod"
              render={({ field: { value, onChange } }) => (
                <RNPickerSelect
                  disabled={loading}
                  placeholder={undefined}
                  style={{
                    viewContainer: {
                      justifyContent: 'space-between',
                      borderColor: '#ddd',
                      paddingVertical: 16,
                      paddingHorizontal: 10,
                      borderRadius: 8,
                      borderWidth: 1,
                      backgroundColor: '#f0f0f0',
                    },
                    placeholder: {
                      color: '#888',
                    },
                  }}
                  value={value}
                  onValueChange={onChange}
                  Icon={IconProvider}
                  items={paymentMethodOptions}
                />
              )}
            />
          </YStack>
          <YStack gap={7}>
            <Label color={'#222'} id={`${inputId}-delivery-option`}>
              Delivery Option
            </Label>
            <Controller
              control={control}
              rules={{ required: true }}
              name="deliveryOption"
              render={({ field: { value } }) => (
                <RNPickerSelect
                  disabled={loading}
                  placeholder={undefined}
                  style={{
                    viewContainer: {
                      justifyContent: 'space-between',
                      borderColor: '#ddd',
                      paddingVertical: 16,
                      paddingHorizontal: 10,
                      borderRadius: 8,
                      borderWidth: 1,
                      backgroundColor: '#f0f0f0',
                    },
                    placeholder: {
                      color: '#888',
                    },
                  }}
                  value={value}
                  Icon={IconProvider}
                  onValueChange={handleDeliveryOptionChange}
                  items={deliveryOptions}
                />
              )}
            />
          </YStack>
          <Form.Trigger asChild>
            <Button size={'$5'} elevate m={30} icon={isSubmitting ? () => <Spinner /> : undefined}>
              Confirm Payment
            </Button>
          </Form.Trigger>
        </Form>
      </ScrollView>
      <CustomSnackbar
        onDismiss={hideSnackbar}
        visible={snackBarValue}
        message={'Paid Successfully'}
      />
    </YStack>
  );
};

export default Page;
