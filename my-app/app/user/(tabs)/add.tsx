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

export default function AddUser() {
  const [loadingCreate, setLoadingCreate] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [birthdate, setBirthdate] = React.useState(new Date());
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState<"Administrador" | "Usuário">();

  function handleBirthdateChange(_: DateTimePickerEvent, newDate?: Date) {
    if (newDate) {
      setBirthdate(newDate);
    }
  }

  function handleSubmit() {}

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 8,
      }}
    >
      <LabeledField label="Nome" onValueChange={setName} value={name} />
      <LabeledField label="E-mail" onValueChange={setEmail} value={email} />
      <LabeledField
        label="Telefone"
        onValueChange={setPhone}
        value={phone}
        inputMode="numeric"
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
      <LabeledField
        label="Senha"
        onValueChange={setPassword}
        value={password}
      />
      <RadioGroup
        label="Permissão"
        possibleValues={["Administrador", "Usuário"]}
        chosenValue={role}
        onValueSelected={setRole}
      />
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
