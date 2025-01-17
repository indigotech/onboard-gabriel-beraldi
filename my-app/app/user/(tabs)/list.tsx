import * as React from "react";
import { FlatList } from "react-native";
import { UserInfoCard } from "@/components/user-info-card";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePagination } from "@/hooks/use-pagination";
import { useFocusEffect } from "expo-router";
import { listUsers } from "@/api/user/list-users";
import { H1 } from "@/components/h1";

export default function UserList() {
  const {
    fetchedData: userList,
    fetchNextPage,
    resetList,
  } = usePagination({
    fetchRequest: listUsers,
  });

  useFocusEffect(resetList);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <H1>Lista de usuários</H1>
      <FlatList
        renderItem={(data) => {
          return (
            <UserInfoCard
              id={data.item.id}
              name={data.item.name}
              email={data.item.email}
            />
          );
        }}
        contentContainerStyle={{ gap: 8 }}
        data={userList}
        keyExtractor={(user) => user.id}
        onEndReached={fetchNextPage}
      />
    </SafeAreaView>
  );
}
