interface ValidationResult {
  valid: boolean;
  errorMessage?: string;
}

const EMAIL_VALIDATION_REGEX = /^\w+(\.\w+)*@(\w+\.)+com(.br)?$/gm;

export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { valid: false, errorMessage: "E-mail vazio." };
  }

  if (!email.match(EMAIL_VALIDATION_REGEX)) {
    return { valid: false, errorMessage: "E-mail invalido." };
  }

  return { valid: true };
}
