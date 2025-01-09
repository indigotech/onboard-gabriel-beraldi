import * as React from "react";
import { Text, TextInput, View } from "react-native";

interface LabeledFieldProps {
  label: string;
  value: string;
  onValueChange: (newValue: string) => void;
  valid?: boolean;
  invalidMessage?: string;
}

export function LabeledField(props: LabeledFieldProps) {
  return (
    <View style={{ gap: 8 }}>
      <Text>{props.label}</Text>
      <TextInput
        onChangeText={props.onValueChange}
        value={props.value}
        style={{ backgroundColor: props.valid ? "#FFF" : "#ffe8e8" }}
      />
      {!props.valid && <Text>{props.invalidMessage}</Text>}
    </View>
  );
}
