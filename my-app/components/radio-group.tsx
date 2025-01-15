import * as React from "react";
import styled from "styled-components";
import { View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Label } from "@/components/label";
import { Caption } from "@/components/caption";

const OptionsContainer = styled(View)`
  gap: 8px;
`;

interface RadioOptionProps<T> {
  value: T;
  onSelected: (thisValue: NoInfer<T>) => void;
  selected: boolean;
}

function RadioOption<const T extends string | number>(
  props: RadioOptionProps<T>,
) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
      }}
      onTouchEnd={() => props.onSelected(props.value)}
    >
      <MaterialIcons
        size={20}
        name={props.selected ? "radio-button-on" : "radio-button-off"}
      />
      <Text>{props.value}</Text>
    </View>
  );
}

interface RadioGroupProps<T extends string | number> {
  label: string;
  options: T[];
  chosenValue?: NoInfer<T>;
  onValueSelected: (newValue: NoInfer<T>) => void;
  errorMessage?: string;
}

export function RadioGroup<const T extends string | number>(
  props: RadioGroupProps<T>,
) {
  const valid = !props.errorMessage;
  return (
    <View>
      <Label color={valid ? undefined : "#FF8080"}>{props.label}</Label>
      <OptionsContainer>
        {props.options.map((value: T) => (
          <RadioOption
            key={value}
            value={value}
            selected={value === props.chosenValue}
            onSelected={(thisValue: T) => props.onValueSelected(thisValue)}
          />
        ))}
      </OptionsContainer>
      {props.errorMessage && <Caption>{props.errorMessage}</Caption>}
    </View>
  );
}
