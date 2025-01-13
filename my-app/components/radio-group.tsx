import * as React from "react";
import { View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
  possibleValues: T[];
  chosenValue?: NoInfer<T>;
  onValueSelected: (newValue: NoInfer<T>) => void;
}

export function RadioGroup<const T extends string | number>(
  props: RadioGroupProps<T>,
) {
  return (
    <View style={{ gap: 8 }}>
      <Text>{props.label}</Text>
      {props.possibleValues.map((value: T) => (
        <RadioOption
          key={value}
          value={value}
          selected={value === props.chosenValue}
          onSelected={(thisValue: T) => props.onValueSelected(thisValue)}
        />
      ))}
    </View>
  );
}
