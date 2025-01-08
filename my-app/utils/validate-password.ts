interface ValidationResult {
  valid: boolean;
  errorMessage?: string;
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { valid: false, errorMessage: "Empty password" };
  }

  if (password.length < 7) {
    return {
      valid: false,
      errorMessage: "Password must be at least 7 characters long",
    };
  }

  if (!password.match(/^(?=.*[A-Za-z])(?=.*\d).*$/gm)) {
    return {
      valid: false,
      errorMessage: "Password must contain both a letter and a number",
    };
  }

  return { valid: true };
}
