import * as React from "react";
import { Text, TextInput, View } from "react-native";

interface LabeledFieldProps {
  label: string;
}

export function LabeledField(props: LabeledFieldProps) {
  return (
    <View
      style={{
        gap: 8,
      }}
    >
      <Text>{props.label}</Text>
      <TextInput
        style={{
          backgroundColor: "#FFF",
        }}
      />
    </View>
  );
}
