import { ValidationResult } from "@/interfaces/validation-result";

const PHONE_VALIDATION_REGEX = /^\d{10,11}$/gm;

export function validatePhone(phone: string): ValidationResult {
  if (!phone) {
    return { valid: false, errorMessage: "Telefone vazio." };
  }

  if (!phone.match(PHONE_VALIDATION_REGEX)) {
    return {
      valid: false,
      errorMessage:
        "Telefone deve conter DDD e ser composto apenas por dígitos.",
    };
  }

  return { valid: true };
}
