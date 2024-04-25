import { Button, Theme, XStack, Input } from 'tamagui';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { Container } from '~/tamagui.config';
import { Feather } from '@expo/vector-icons';

const Page = () => {
  const snapPoints = useMemo(() => ['25%', '50%', '70%', '90%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClose = () => bottomSheetRef.current?.close();
  const handleOpen = () => bottomSheetRef.current?.expand();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={0} {...props} />
    ),
    []
  );

  useEffect(() => {
    // searchRef?.current?.focus();
  }, []);

  return (
    <Container flex={1} backgroundColor={'#fff'} pt={10} px={10}>
      <XStack space={'$4'} alignItems="center">
        <Theme name={'light'}>
          <Input
            keyboardType="default"
            outlineWidth={0}
            borderColor={'#ddd'}
            size={'$4'}
            color={'#222'}
            placeholder="Search Book"
            flex={1}
          />
        </Theme>
        <Button
          unstyled
          onPress={handleOpen}
          scale={0.95}
          pressStyle={{ scale: 0.975 }}
          animation={'bouncy'}
          icon={<Feather name="filter" size={22} color={'#444'} />}
        />
      </XStack>
      {/* TODO: filtering books */}
      {/* feature */}

      {/* <BottomSheet
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}>
        <View flex={1} alignItems="center">
          <Text fontSize={24}>filter</Text>
        </View>
      </BottomSheet> */}
    </Container>
  );
};

export default Page;
