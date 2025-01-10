import { LabeledField } from "@/components/labeled-field";
import { validateEmail } from "@/utils/validate-email";
import { validatePassword } from "@/utils/validate-password";
import * as React from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const [email, setEmail] = React.useState("");
  const [validEmail, setValidEmail] = React.useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");

  function handleEmailChange(newEmail: string) {
    setEmail(newEmail);
  }

  const [password, setPassword] = React.useState("");
  const [validPassword, setValidPassword] = React.useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  function handlePasswordChange(newPassword: string) {
    setPassword(newPassword);
  }

  function handleSubmit() {
    const emailValidationResult = validateEmail(email);

    setValidEmail(emailValidationResult.valid);
    setEmailErrorMessage(emailValidationResult.errorMessage ?? "");

    const passwordValidationResult = validatePassword(password);

    setValidPassword(passwordValidationResult.valid);
    setPasswordErrorMessage(passwordValidationResult.errorMessage ?? "");
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
        valid={validEmail}
        invalidMessage={emailErrorMessage}
        inputMode="email"
      />
      <LabeledField
        label="Senha:"
        value={password}
        onValueChange={handlePasswordChange}
        valid={validPassword}
        invalidMessage={passwordErrorMessage}
        inputMode="text"
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
