import { ValidationResult } from "@/interfaces/validation-result";

const NAME_VALIDATION_REGEX = /^[A-Za-z]+( [A-Za-z]+)+$/gm;

export function validateName(name: string): ValidationResult {
  if (!name) {
    return { valid: false, errorMessage: "Nome vazio." };
  }

  if (!name.match(NAME_VALIDATION_REGEX)) {
    return { valid: false, errorMessage: "Nome deve se completo." };
  }

  return { valid: true };
}
