interface ValidationResult {
  valid: boolean;
  errorMessage?: string;
}

const DIGIT_AND_LETTER_REGEX = /^(?=.*[A-Za-z])(?=.*\d).*$/gm;

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { valid: false, errorMessage: "Senha vazia." };
  }

  if (password.length < 7) {
    return {
      valid: false,
      errorMessage: "Senha deve conter pelo menos 7 caracteres.",
    };
  }

  if (!password.match(DIGIT_AND_LETTER_REGEX)) {
    return {
      valid: false,
      errorMessage: "Senha deve conter pelo menos um número e uma letra.",
    };
  }

  return { valid: true };
}
