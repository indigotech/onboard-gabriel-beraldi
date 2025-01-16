import * as React from "react";
import { LabeledField } from "@/components/labeled-field";
import { RadioGroup } from "@/components/radio-group";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  ActivityIndicator,
  Pressable,
  View,
  Text,
  Platform,
} from "react-native";
import {
  validateEmail,
  validateName,
  validatePhone,
  validatePassword,
  validateBirthdate,
} from "@/utils";

export default function AddUser() {
  const [loadingCreate, setLoadingCreate] = React.useState(false);

  const [name, setName] = React.useState("");
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");

  const [phone, setPhone] = React.useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState("");

  const [birthdate, setBirthdate] = React.useState(new Date());
  const [birthdateErrorMessage, setBirthdateErrorMessage] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const [role, setRole] = React.useState<"Administrador" | "Usuário">();
  const [missingRole, setMissingRole] = React.useState(false);

  function handleBirthdateChange(_: DateTimePickerEvent, newDate?: Date) {
    if (newDate) {
      setBirthdate(newDate);
    }
  }

  function handleSubmit() {
    if (loadingCreate) {
      return;
    }

    const emailValidationResult = validateEmail(email);
    const nameValidationResult = validateName(name);
    const phoneValidationResult = validatePhone(phone);
    const passwordValidationResult = validatePassword(password);
    const birthdateValidationResult = validateBirthdate(birthdate);
    const isRoleMissing = role === undefined;

    setEmailErrorMessage(emailValidationResult.errorMessage ?? "");
    setNameErrorMessage(nameValidationResult.errorMessage ?? "");
    setPhoneErrorMessage(phoneValidationResult.errorMessage ?? "");
    setPasswordErrorMessage(passwordValidationResult.errorMessage ?? "");
    setBirthdateErrorMessage(birthdateValidationResult.errorMessage ?? "");
    setMissingRole(isRoleMissing);

    const validForm =
      emailValidationResult?.valid &&
      nameValidationResult?.valid &&
      phoneValidationResult?.valid &&
      passwordValidationResult?.valid &&
      birthdateValidationResult?.valid &&
      !missingRole;

    if (!validForm) {
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
        label="Nome Completo:"
        onValueChange={setName}
        value={name}
        invalidMessage={nameErrorMessage}
      />
      <LabeledField
        label="E-mail:"
        onValueChange={setEmail}
        value={email}
        invalidMessage={emailErrorMessage}
      />
      <LabeledField
        label="Telefone (com DDD):"
        onValueChange={setPhone}
        value={phone}
        inputMode="numeric"
        invalidMessage={phoneErrorMessage}
      />
      <Text>Data de Nascimento:</Text>
      {Platform.OS === "android" ? (
        <Pressable
          onPress={() =>
            DateTimePickerAndroid.open({
              value: birthdate,
              mode: "date",
              display: "spinner",
              onChange: handleBirthdateChange,
            })
          }
          style={{
            backgroundColor: "#FFF",
            padding: 12,
          }}
        >
          <Text>{birthdate.toLocaleDateString()}</Text>
        </Pressable>
      ) : (
        <DateTimePicker
          onChange={handleBirthdateChange}
          mode="date"
          value={birthdate}
        />
      )}
      {birthdateErrorMessage && <Text>{birthdateErrorMessage}</Text>}
      <LabeledField
        label="Senha:"
        onValueChange={setPassword}
        value={password}
        invalidMessage={passwordErrorMessage}
      />
      <RadioGroup
        label="Nível de Permissão:"
        options={["Administrador", "Usuário"]}
        chosenValue={role}
        onValueSelected={setRole}
      />
      {missingRole && <Text>Selecione o nível de permissão desejada</Text>}
      <Pressable
        onPress={handleSubmit}
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
        }}
      >
        {loadingCreate ? <ActivityIndicator /> : <Text>Criar</Text>}
      </Pressable>
    </View>
  );
}
