import * as React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { LabeledField } from "@/components/labeled-field";
import { validateEmail, validatePassword } from "@/utils";
import { login } from "@/api/user/login";
import { authTokenProvider } from "@/utils/auth-token-provider";

export default function Index() {
  const router = useRouter();

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

  const [loadingLogin, setLoadingLogin] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");

  function handleSubmit() {
    if (!loadingLogin) {
      const emailValidationResult = validateEmail(email);

      setValidEmail(emailValidationResult.valid);
      setEmailErrorMessage(emailValidationResult.errorMessage ?? "");

      const passwordValidationResult = validatePassword(password);

      setValidPassword(passwordValidationResult.valid);
      setPasswordErrorMessage(passwordValidationResult.errorMessage ?? "");

      if (emailValidationResult.valid && passwordValidationResult.valid) {
        setLoadingLogin(true);
        login(email, password).then((response) => {
          setLoadingLogin(false);
          if (response.data) {
            authTokenProvider.setToken(response.data.token);
            setLoginError("");
            router.push("/user/list");
          } else {
            setLoginError(response.errors?.[0].message ?? "");
          }
        });
      }
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
        {loadingLogin ? <ActivityIndicator /> : <Text>Entrar</Text>}
      </Pressable>
      {loginError && <Text>{loginError}</Text>}
    </View>
  );
}
