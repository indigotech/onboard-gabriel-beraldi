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
import { ValidationResult } from "@/interfaces/validation-result";
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
  const [nameValidation, setNameValidation] =
    React.useState<ValidationResult>();

  const [email, setEmail] = React.useState("");
  const [emailValidation, setEmailValidation] =
    React.useState<ValidationResult>();

  const [phone, setPhone] = React.useState("");
  const [phoneValidation, setPhoneValidation] =
    React.useState<ValidationResult>();

  const [birthdate, setBirthdate] = React.useState(new Date());
  const [birthdateValidation, setBirthdateValidation] =
    React.useState<ValidationResult>();

  const [password, setPassword] = React.useState("");
  const [passwordValidation, setPasswordValidation] =
    React.useState<ValidationResult>();

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

    setEmailValidation(emailValidationResult);
    setNameValidation(nameValidationResult);
    setPhoneValidation(phoneValidationResult);
    setPasswordValidation(passwordValidationResult);
    setBirthdateValidation(birthdateValidationResult);
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
        label="Nome"
        onValueChange={setName}
        value={name}
        valid={nameValidation?.valid}
        invalidMessage={nameValidation?.errorMessage}
      />
      <LabeledField
        label="E-mail"
        onValueChange={setEmail}
        value={email}
        valid={emailValidation?.valid}
        invalidMessage={emailValidation?.errorMessage}
      />
      <LabeledField
        label="Telefone"
        onValueChange={setPhone}
        value={phone}
        inputMode="numeric"
        valid={phoneValidation?.valid}
        invalidMessage={phoneValidation?.errorMessage}
      />
      <Text>Data de Nascimento</Text>
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
      {birthdateValidation?.valid === false && (
        <Text>{birthdateValidation.errorMessage}</Text>
      )}
      <LabeledField
        label="Senha"
        onValueChange={setPassword}
        value={password}
        valid={passwordValidation?.valid}
        invalidMessage={passwordValidation?.errorMessage}
      />
      <RadioGroup
        label="Permissão"
        possibleValues={["Administrador", "Usuário"]}
        chosenValue={role}
        onValueSelected={setRole}
      />
      {missingRole && <Text>Selecione um dos valores</Text>}
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
