import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'tamagui';
import { useHistoryStore } from '~/store';
import { HistoryItem } from '~/types';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { items } = useHistoryStore();
  const [item, setItem] = useState<HistoryItem>();

  useEffect(() => {
    const result = items.find((x) => x._id === id);

    if (result) {
      setItem(result);

      return;
    }
  }, [id]);

  return (
    <View>
      <Text>{item && item?.fullName}</Text>
    </View>
  );
};

export default Page;
