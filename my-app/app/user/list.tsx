import { UserInfoCard } from "@/components/user-info-card";
import * as React from "react";
import { View, FlatList } from "react-native";

const userList = [
  {
    name: "Exemplo 1",
    email: "exemplo1@exemplo.com",
  },
  {
    name: "Exemplo 2",
    email: "exemplo2@exemplo.com",
  },
  {
    name: "Exemplo 3",
    email: "exemplo3@exemplo.com",
  },
];

export default function UserList() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <FlatList
        renderItem={(data) => {
          return <UserInfoCard name={data.item.name} email={data.item.email} />;
        }}
        contentContainerStyle={{ gap: 8 }}
        data={userList}
      />
    </View>
  );
}
