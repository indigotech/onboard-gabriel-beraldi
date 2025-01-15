import * as React from "react";
import { Platform, Pressable, View, Text } from "react-native";
import { Label } from "@/components/label";
import { Caption } from "@/components/caption";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

interface DatePickerProps {
  label: string;
  value: Date;
  onValueChange: (newValue?: Date) => void;
  invalidMessage?: string;
}

export function DatePicker(props: DatePickerProps) {
  const valid = !props.invalidMessage;
  return (
    <View>
      <Label color={valid ? undefined : "#FF8080"}>{props.label}</Label>
      {Platform.OS === "android" ? (
        <Pressable
          onPress={() =>
            DateTimePickerAndroid.open({
              value: props.value,
              mode: "date",
              display: "spinner",
              onChange: (_, newDate) => props.onValueChange(newDate),
            })
          }
          style={{
            backgroundColor: "#FFF",
            padding: 12,
          }}
        >
          <Text>{props.value.toLocaleDateString()}</Text>
        </Pressable>
      ) : (
        <DateTimePicker
          onChange={(_, newDate) => props.onValueChange(newDate)}
          mode="date"
          value={props.value}
        />
      )}
      {props.invalidMessage && <Caption>{props.invalidMessage}</Caption>}
    </View>
  );
}
