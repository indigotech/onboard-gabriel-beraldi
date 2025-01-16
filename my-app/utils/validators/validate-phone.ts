import { ValidationResult } from "@/interfaces/validation-result";

const PHONE_VALIDATION_REGEX = /^\d{10,11}$/gm;

export function validatePhone(phone: string): ValidationResult {
  if (!phone) {
    return { valid: false, errorMessage: "O telefone é um campo obrigatório." };
  }

  if (!phone.match(PHONE_VALIDATION_REGEX)) {
    return {
      valid: false,
      errorMessage:
        "O telefone deve conter DDD e ser composto apenas por dígitos.",
    };
  }

  return { valid: true };
}
