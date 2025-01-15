import * as React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { H1 } from "@/components/h1";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "@/interfaces/user";
import { roleEnToPt } from "@/utils";
import { getUserDetails } from "@/api/user/get-user-details";
import { useLocalSearchParams } from "expo-router";

export default function UserDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    async function fetchUserDetails() {
      setLoading(true);
      const response = await getUserDetails(id);
      setLoading(false);
      if (response.data) {
        setUser(response.data);
        setErrorMessage(undefined);
      } else {
        setErrorMessage(response.errors?.[0].message);
      }
    }

    fetchUserDetails();
  }, [id]);

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"large"} />
    </View>
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <>
          <H1>Detalhes do Usuário</H1>
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
        </>
      )}
    </SafeAreaView>
  );
}
