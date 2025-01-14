import { ValidationResult } from "@/interfaces/validation-result";

const NAME_VALIDATION_REGEX = /^[A-Za-z]+( [A-Za-z]+)+$/gm;

export function validateName(name: string): ValidationResult {
  if (!name) {
    return { valid: false, errorMessage: "O nome é um campo obrigatório." };
  }

  if (!name.match(NAME_VALIDATION_REGEX)) {
    return { valid: false, errorMessage: "Preencha seu nome completo." };
  }

  return { valid: true };
}
