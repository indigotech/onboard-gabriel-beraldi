import * as React from "react";
import styled from "styled-components";
import { InputModeOptions, TextInput, View } from "react-native";
import { Label } from "@/components/label";
import { Caption } from "./caption";

interface InputProps {
  borderColor?: string;
}

const Input = styled(TextInput)<InputProps>`
  border-bottom-width: 1px;
  border-bottom-color: ${({ borderColor }) => borderColor ?? "#777777"};
`;

interface LabeledFieldProps {
  label: string;
  value: string;
  onValueChange: (newValue: string) => void;
  invalidMessage?: string;
  inputMode?: InputModeOptions;
}

export function LabeledField(props: LabeledFieldProps) {
  const valid = !props.invalidMessage;
  return (
    <View>
      <Label color={valid ? undefined : "#FF8080"}>{props.label}</Label>
      <Input
        borderColor={valid ? undefined : "#FF8080"}
        onChangeText={props.onValueChange}
        value={props.value}
        inputMode={props.inputMode}
        autoCapitalize="none"
      />
      {props.invalidMessage && <Caption>{props.invalidMessage}</Caption>}
    </View>
  );
}
