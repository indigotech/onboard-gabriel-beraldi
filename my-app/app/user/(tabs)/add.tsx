import * as React from "react";
import { LabeledField } from "@/components/labeled-field";
import { RadioGroup } from "@/components/radio-group";
import { H1 } from "@/components/h1";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Pressable, Text, Platform } from "react-native";
import {
  validateEmail,
  validateName,
  validatePhone,
  validatePassword,
  validateBirthDate,
  PossibleRolesPt,
  rolePtToEn,
  getDatePortion,
} from "@/utils";
import { addUser } from "@/api/user/add-user";
import { useRouter } from "expo-router";

export default function AddUser() {
  const router = useRouter();
  const [loadingCreate, setLoadingCreate] = React.useState(false);
  const [createError, setCreateError] = React.useState("");

  const [name, setName] = React.useState("");
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");

  const [phone, setPhone] = React.useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState("");

  const [birthDate, setBirthDate] = React.useState(new Date());
  const [birthDateErrorMessage, setBirthDateErrorMessage] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const [role, setRole] = React.useState<PossibleRolesPt>();
  const [missingRole, setMissingRole] = React.useState(false);

  function handleBirthDateChange(_: DateTimePickerEvent, newDate?: Date) {
    if (newDate) {
      setBirthDate(newDate);
    }
  }

  function resetForm() {
    setLoadingCreate(false);
    setCreateError("");
    setName("");
    setNameErrorMessage("");
    setEmail("");
    setEmailErrorMessage("");
    setPhone("");
    setPhoneErrorMessage("");
    setBirthDate(new Date());
    setBirthDateErrorMessage("");
    setPassword("");
    setPasswordErrorMessage("");
    setRole(undefined);
    setMissingRole(false);
  }

  async function handleSubmit() {
    if (loadingCreate) {
      return;
    }

    const emailValidationResult = validateEmail(email);
    const nameValidationResult = validateName(name);
    const phoneValidationResult = validatePhone(phone);
    const passwordValidationResult = validatePassword(password);
    const birthDateValidationResult = validateBirthDate(birthDate);
    const isRoleMissing = role === undefined;

    setEmailErrorMessage(emailValidationResult.errorMessage ?? "");
    setNameErrorMessage(nameValidationResult.errorMessage ?? "");
    setPhoneErrorMessage(phoneValidationResult.errorMessage ?? "");
    setPasswordErrorMessage(passwordValidationResult.errorMessage ?? "");
    setBirthDateErrorMessage(birthDateValidationResult.errorMessage ?? "");
    setMissingRole(isRoleMissing);

    const validForm =
      emailValidationResult?.valid &&
      nameValidationResult?.valid &&
      phoneValidationResult?.valid &&
      passwordValidationResult?.valid &&
      birthDateValidationResult?.valid &&
      !isRoleMissing;

    if (!validForm) {
      return;
    }

    setLoadingCreate(true);
    const response = await addUser({
      name,
      email,
      phone,
      birthDate: getDatePortion(birthDate),
      password,
      role: rolePtToEn(role),
    });
    setLoadingCreate(false);

    if (response.data) {
      resetForm();
      router.push("/user/list");
    } else {
      setCreateError(response.errors?.[0].message ?? "");
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
      <H1>Adicione um Usuário</H1>
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
              value: birthDate,
              mode: "date",
              display: "spinner",
              onChange: handleBirthDateChange,
            })
          }
          style={{
            backgroundColor: "#FFF",
            padding: 12,
          }}
        >
          <Text>{birthDate.toLocaleDateString()}</Text>
        </Pressable>
      ) : (
        <DateTimePicker
          onChange={handleBirthDateChange}
          mode="date"
          value={birthDate}
        />
      )}
      {birthDateErrorMessage && <Text>{birthDateErrorMessage}</Text>}
      <LabeledField
        label="Senha:"
        onValueChange={setPassword}
        value={password}
        invalidMessage={passwordErrorMessage}
      />
      <RadioGroup
        label="Nível de Permissão:"
        options={[PossibleRolesPt.admin, PossibleRolesPt.user]}
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
      {createError && <Text>{createError}</Text>}
    </SafeAreaView>
  );
}
