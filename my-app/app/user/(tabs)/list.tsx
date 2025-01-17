import * as React from "react";
import { usePagination } from "@/hooks/use-pagination";
import { listUsers } from "@/api/user/list";
import { View, FlatList } from "react-native";
import { UserInfoCard } from "@/components/user-info-card";
import { useFocusEffect } from "expo-router";

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
        keyExtractor={(user) => user.id}
        onEndReached={fetchNextPage}
      />
    </View>
  );
}
