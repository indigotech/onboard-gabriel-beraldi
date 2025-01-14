import * as React from "react";
import { View, Text } from "react-native";

interface UserInfoCardProps {
  name: string;
  email: string;
}

export function UserInfoCard(props: UserInfoCardProps) {
  return (
    <View
      style={{
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
      }}
    >
      <Text>{`\u2022 Nome: ${props.name}`}</Text>
      <Text>{`\u2022 Email: ${props.email}`}</Text>
    </View>
  );
}
