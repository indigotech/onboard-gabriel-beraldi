import { LabeledField } from "@/components/labeled-field";
import * as React from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const [email, setEmail] = React.useState("");

  function handleEmailChange(newEmail: string) {
    setEmail(newEmail);
  }

  const [password, setPassword] = React.useState("");

  function handlePasswordChange(newPassword: string) {
    setPassword(newPassword);
  }

  function handleSubmit() {
    if (!email) {
      console.log("empty email");
      return;
    }

    const [local, domain, ...invalidChars] = email.split("@");
    if (invalidChars && invalidChars.length > 0) {
      console.log("invalid email");
      return;
    }

    if (!local || local.length === 0) {
      console.log("invalid email");
      return;
    }

    if (!domain || domain.length <= 4) {
      console.log("invalid email");
      return;
    }

    const lastHostname = domain.split(".").pop();

    if (!lastHostname || lastHostname !== "com") {
      console.log("invalid email");
      return;
    }

    if (!password) {
      console.log("empty password");
      return;
    }

    if (password.length < 7) {
      console.log("password must be at least 7 characters long");
      return;
    }

    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d).*$/gm)) {
      console.log("password must contain both a letter and a number");
      return;
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 8,
      }}
    >
      <LabeledField
        label="Email:"
        value={email}
        onValueChange={handleEmailChange}
      />
      <LabeledField
        label="Senha:"
        value={password}
        onValueChange={handlePasswordChange}
      />
      <Pressable
        onPress={handleSubmit}
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
