import { LabeledField } from "@/components/labeled-field";
import { validateEmail } from "@/utils/validate-email";
import { validatePassword } from "@/utils/validate-password";
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
    const { valid: validEmail, errorMessage: emailErrorMessage } =
      validateEmail(email);

    if (!validEmail) {
      console.log(emailErrorMessage);
    }

    const { valid: validPassword, errorMessage: passwordErrorMessage } =
      validatePassword(password);

    if (!validPassword) {
      console.log(passwordErrorMessage);
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
