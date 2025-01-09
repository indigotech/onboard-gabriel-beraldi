interface ValidationResult {
  valid: boolean;
  errorMessage?: string;
}

export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { valid: false, errorMessage: "E-mail vazio." };
  }

  const [local, domain, ...invalidChars] = email.split("@");
  if (invalidChars && invalidChars.length > 0) {
    return { valid: false, errorMessage: "E-mail invalido." };
  }

  if (!local || local.length === 0) {
    return { valid: false, errorMessage: "E-mail invalido." };
  }

  if (!domain || domain.length <= 4) {
    return { valid: false, errorMessage: "E-mail invalido." };
  }

  const lastHostname = domain.split(".").pop();

  if (!lastHostname || lastHostname !== "com") {
    return { valid: false, errorMessage: "E-mail invalido." };
  }

  return { valid: true };
}
