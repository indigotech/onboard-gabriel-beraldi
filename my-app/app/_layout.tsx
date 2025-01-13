import * as React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Bem-Vindo(a) à Taqtile" }}
      />
      <Stack.Screen name="user/list" options={{ title: "Lista de Usuários" }} />
    </Stack>
  );
}
