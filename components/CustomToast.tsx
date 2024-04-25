import { XStack, Button, YStack, Label, Switch } from 'tamagui';
import { Toast, useToastController, useToastState } from '@tamagui/toast';

export const ToastControl = ({ native }: { native?: boolean }) => {
  const toast = useToastController();
  return (
    <XStack space="$2" justifyContent="center">
      <Button
        onPress={() => {
          toast.show('Successfully saved!', {
            message: "Don't worry, we've got your data.",
            native,
          });
        }}>
        Show
      </Button>
      <Button
        onPress={() => {
          toast.hide();
        }}>
        Hide
      </Button>
    </XStack>
  );
};

export const CurrentToast = () => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}>
      <YStack>
        <Toast.Title>{currentToast.title}</Toast.Title>
        {!!currentToast.message && <Toast.Description>{currentToast.message}</Toast.Description>}
      </YStack>
    </Toast>
  );
};

export const NativeOptions = ({
  native,
  setNative,
}: {
  native: boolean;
  setNative: (native: boolean) => void;
}) => {
  return (
    <XStack space="$3">
      <Label size="$1" onPress={() => setNative(false)}>
        Custom
      </Label>
      <Switch
        id="native-toggle"
        nativeID="native-toggle"
        theme="active"
        size="$1"
        checked={!!native}
        onCheckedChange={(val) => setNative(val)}>
        <Switch.Thumb
          animation={[
            'quick',
            {
              transform: {
                overshootClamping: true,
              },
            },
          ]}
        />
      </Switch>

      <Label size="$1" onPress={() => setNative(true)}>
        Native
      </Label>
    </XStack>
  );
};
