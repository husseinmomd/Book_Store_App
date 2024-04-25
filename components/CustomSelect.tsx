import { Feather } from '@expo/vector-icons';
import { useEffect, useMemo } from 'react';
import { Adapt, Select, SelectProps, Sheet, YStack } from 'tamagui';

interface CustomSelectProps extends SelectProps {
  items: {
    name: string;
  }[];
}
export function CustomSelect(props: CustomSelectProps) {
  const { items, value, onValueChange, id } = props;

  useEffect(() => {
    console.log('dropdown props:', { ...props });
  }, [id]);

  return (
    <Select
      value={value ?? 'Option Value!!'}
      onValueChange={onValueChange}
      disablePreventBodyScroll
      {...props}>
      <Select.Trigger
        backgroundColor={'#f0f0f0'}
        borderRadius={9}
        borderColor={'#ddd'}
        iconAfter={<Feather color={'#000'} name="chevron-down" />}>
        <Select.Value color={'#222'} />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          snapPoints={[20, 30]}
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 30,
            mass: 1.2,
            stiffness: 300,
          }}>
          <Sheet.Frame backgroundColor={'#f0f0f0'}>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3">
          <YStack zIndex={10}>
            <Feather name="check" size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport backgroundColor={'#f0f0f0'} minWidth={200}>
          <Select.Group backgroundColor={'#f0f0f0'}>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item
                      backgroundColor={'#f0f0f0'}
                      index={i}
                      key={item.name}
                      value={item.name.toLowerCase()}>
                      <Select.ItemText color={'#000'}>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Feather name="check" size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [items]
            )}
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={'$4'}
              pointerEvents="none">
              {/* <Feather
                name="chevron-down"
                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
              /> */}
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3">
          <YStack zIndex={10}>
            <Feather name="chevron-down" size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
