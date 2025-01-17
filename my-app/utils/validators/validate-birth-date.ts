import { ValidationResult } from "@/interfaces/validation-result";

export function validateBirthDate(birthdate: Date): ValidationResult {
  if (birthdate > new Date() || birthdate < new Date(1900, 0, 1)) {
    return {
      valid: false,
      errorMessage: "Essa data de nascimento é invalida.",
    };
  }

  return { valid: true };
}
