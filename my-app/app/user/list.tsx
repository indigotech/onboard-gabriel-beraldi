import * as React from "react";
import { listUsers } from "@/api/user/list";
import { User } from "@/interfaces/user";
import { View, FlatList } from "react-native";
import { UserInfoCard } from "@/components/user-info-card";

export default function UserList() {
  const [userList, setUserList] = React.useState<User[]>([]);

  React.useEffect(() => {
    function fetchUsers() {
      listUsers().then((response) => {
        setUserList(response.data?.nodes ?? []);
      });
    }

    fetchUsers();
  }, []);
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
