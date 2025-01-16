import * as React from "react";
import { InputModeOptions, Text, TextInput, View } from "react-native";

interface LabeledFieldProps {
  label: string;
  value: string;
  onValueChange: (newValue: string) => void;
  invalidMessage?: string;
  inputMode?: InputModeOptions;
}

export function LabeledField(props: LabeledFieldProps) {
  return (
    <View style={{ gap: 8 }}>
      <Text>{props.label}</Text>
      <TextInput
        onChangeText={props.onValueChange}
        value={props.value}
        style={{ backgroundColor: props.invalidMessage ? "#ffe8e8" : "#FFF" }}
        inputMode={props.inputMode}
        autoCapitalize="none"
      />
      {props.invalidMessage && <Text>{props.invalidMessage}</Text>}
    </View>
  );
}
