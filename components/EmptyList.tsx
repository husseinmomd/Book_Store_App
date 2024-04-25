import { ImageSourcePropType } from 'react-native';
import { SizableText, YStack, Image, Text, Theme, Button, View } from 'tamagui';

interface EmptyListProp {
  title: string;
  subTitle: string;
  imageSource: ImageSourcePropType;
  hasButton?: boolean;
  buttonTitle?: string;
  handelNavigation?: () => void;
}

export function EmptyList({
  title,
  subTitle,
  imageSource,
  hasButton = false,
  buttonTitle,
  handelNavigation,
}: EmptyListProp) {
  return (
    <YStack mt={40} px={40} justifyContent="center" alignItems="center">
      <SizableText fontFamily="$body" fontWeight={'bold'} size={'$6'} color={'#000'}>
        {title}
      </SizableText>
      <View alignSelf="center" mt={30} height={60} width={60}>
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          source={imageSource}
        />
      </View>
      <Text mt={30} fontWeight={'200'} textAlign="center">
        {subTitle}
      </Text>
      {hasButton && (
        <Theme name={'green'}>
          <Button onPress={handelNavigation} size={'$4'} elevate mt={30}>
            {buttonTitle}
          </Button>
        </Theme>
      )}
    </YStack>
  );
}
