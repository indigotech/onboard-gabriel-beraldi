import * as React from "react";
import { View, Text } from "react-native";
import { User } from "@/interfaces/user";
import { PossibleRolesEn, roleEnToPt } from "@/utils";

export default function UserDetails() {
  const user: User = {
    id: "1",
    name: "nome completo",
    email: "exemplo@exemplo.com",
    birthDate: "2020-01-01",
    phone: "11987654321",
    role: PossibleRolesEn.admin,
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <Text>
        <Text style={{ fontWeight: "bold" }}>Nome Completo:</Text> {user.name}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>E-Mail:</Text> {user.email}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Telefone:</Text> {user.phone}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Data de nascimento:</Text>{" "}
        {user.birthDate}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Nível de perissão:</Text>{" "}
        {roleEnToPt(user.role)}
      </Text>
    </View>
  );
}
