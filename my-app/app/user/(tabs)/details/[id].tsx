import * as React from "react";
import { View, Text } from "react-native";
import { User } from "@/interfaces/user";
import { roleEnToPt } from "@/utils";
import { detailUser } from "@/api/user/detail";
import { useLocalSearchParams } from "expo-router";

export default function UserDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    async function fetchUserDetails() {
      const response = await detailUser(id);
      if (response.data) {
        setUser(response.data);
      }
    }

    fetchUserDetails();
  }, [id]);

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <Text>
        <Text style={{ fontWeight: "bold" }}>Nome Completo:</Text>{" "}
        {user?.name ?? "Não Informado"}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>E-Mail:</Text>{" "}
        {user?.email ?? "Não Informado"}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Telefone:</Text>{" "}
        {user?.phone ?? "Não Informado"}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Data de nascimento:</Text>{" "}
        {user?.birthDate ?? "Não Informado"}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Nível de perissão:</Text>{" "}
        {user?.role ? roleEnToPt(user.role) : "Não Informado"}
      </Text>
    </View>
  );
}
