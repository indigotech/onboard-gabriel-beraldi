import { ValidationResult } from "@/interfaces/validation-result";

const EMAIL_VALIDATION_REGEX = /^\w+(\.\w+)*@(\w+\.)+com(.br)?$/gm;

export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { valid: false, errorMessage: "O e-mail é um campo obrigatório." };
  }

  if (!email.match(EMAIL_VALIDATION_REGEX)) {
    return { valid: false, errorMessage: "Esse e-mail é invalido." };
  }

  return { valid: true };
}
