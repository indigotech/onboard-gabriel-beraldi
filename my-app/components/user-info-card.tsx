import * as React from "react";
import { Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

interface UserInfoCardProps {
  id: string;
  name: string;
  email: string;
}

export function UserInfoCard(props: UserInfoCardProps) {
  const router = useRouter();

  function handlePress() {
    router.push({
      pathname: "/user/(tabs)/details/[id]",
      params: { id: props.id },
    });
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
      }}
    >
      <Text>{`\u2022 Nome: ${props.name}`}</Text>
      <Text>{`\u2022 Email: ${props.email}`}</Text>
    </Pressable>
  );
}
