import * as React from "react";
import { Text, TextInput, View } from "react-native";

interface LabeledFieldProps {
  label: string;
  value: string;
  onValueChange: (newValue: string) => void;
}

export function LabeledField(props: LabeledFieldProps) {
  return (
    <View style={{ gap: 8 }}>
      <Text>{props.label}</Text>
      <TextInput
        onChangeText={props.onValueChange}
        value={props.value}
        style={{ backgroundColor: "#FFF" }}
      />
    </View>
  );
}
