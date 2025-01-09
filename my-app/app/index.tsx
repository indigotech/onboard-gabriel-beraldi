import { LabeledField } from "@/components/labeled-field";
import * as React from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 8,
      }}
    >
      <LabeledField label="Email:" />
      <LabeledField label="Senha:" />
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
        }}
      >
        <Text>Entrar</Text>
      </Pressable>
    </View>
  );
}
