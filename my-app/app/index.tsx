import * as React from "react";
import { Text } from "react-native";
import { LabeledField } from "@/components/labeled-field";
import { H1 } from "@/components/h1";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { validateEmail, validatePassword } from "@/utils";
import { login } from "@/api/user/login";
import { authTokenProvider } from "@/utils/auth-token-provider";
import { Button } from "@/components/button";

export default function Index() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");

  function handleEmailChange(newEmail: string) {
    setEmail(newEmail);
  }

  const [password, setPassword] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  function handlePasswordChange(newPassword: string) {
    setPassword(newPassword);
  }

  const [loadingLogin, setLoadingLogin] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");

  async function handleSubmit() {
    if (loadingLogin) {
      return;
    }

    const emailValidationResult = validateEmail(email);
    setEmailErrorMessage(emailValidationResult.errorMessage ?? "");

    const passwordValidationResult = validatePassword(password);
    setPasswordErrorMessage(passwordValidationResult.errorMessage ?? "");

    if (!emailValidationResult.valid || !passwordValidationResult.valid) {
      return;
    }

    setLoadingLogin(true);
    const response = await login(email, password);
    setLoadingLogin(false);

    if (response.data) {
      authTokenProvider.setToken(response.data.token);
      setLoginError("");
      router.push("/user/list");
    } else {
      setLoginError(response.errors?.[0].message ?? "");
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
        gap: 8,
      }}
    >
      <H1>Bem-Vindo(a) à Taqtile</H1>
      <LabeledField
        label="Email:"
        value={email}
        onValueChange={handleEmailChange}
        invalidMessage={emailErrorMessage}
        inputMode="email"
      />
      <LabeledField
        label="Senha:"
        value={password}
        onValueChange={handlePasswordChange}
        invalidMessage={passwordErrorMessage}
        inputMode="text"
      />
      <Button label="Entrar" loading={loadingLogin} onClick={handleSubmit} />
      {loginError && <Text>{loginError}</Text>}
    </SafeAreaView>
  );
}
