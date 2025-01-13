import { ValidationResult } from "@/interfaces/validation-result";

export function validateBirthdate(birthdate: Date): ValidationResult {
  if (birthdate > new Date() || birthdate < new Date(1900, 0, 1)) {
    return { valid: false, errorMessage: "Data de nascimento invalida." };
  }

  return { valid: true };
}
