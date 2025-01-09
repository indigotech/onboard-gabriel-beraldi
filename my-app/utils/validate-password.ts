interface ValidationResult {
  valid: boolean;
  errorMessage?: string;
}

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

  if (!password.match(/^(?=.*[A-Za-z])(?=.*\d).*$/gm)) {
    return {
      valid: false,
      errorMessage: "Senha deve conter pelo menos um número e uma letra.",
    };
  }

  return { valid: true };
}
