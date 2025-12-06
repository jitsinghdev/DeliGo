// src/config/toastConfig.tsx
import React from 'react';
import { View, Text } from 'react-native';

type ToastProps = {
  text1: string;
  text2?: string;
};

export const toastConfig = {
  error: (props: ToastProps) => (
    <View style={{ backgroundColor: 'red', padding: 16, borderRadius: 10 }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.text1}</Text>
      {props.text2 && <Text style={{ color: 'white' }}>{props.text2}</Text>}
    </View>
  ),
};
