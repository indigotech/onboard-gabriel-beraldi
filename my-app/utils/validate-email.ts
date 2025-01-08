interface ValidationResult {
  valid: boolean;
  errorMessage?: string;
}

export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { valid: false, errorMessage: "Empty E-mail" };
  }

  const [local, domain, ...invalidChars] = email.split("@");
  if (invalidChars && invalidChars.length > 0) {
    return { valid: false, errorMessage: "Invalid email" };
  }

  if (!local || local.length === 0) {
    return { valid: false, errorMessage: "Invalid email" };
  }

  if (!domain || domain.length <= 4) {
    return { valid: false, errorMessage: "Invalid email" };
  }

  const lastHostname = domain.split(".").pop();

  if (!lastHostname || lastHostname !== "com") {
    return { valid: false, errorMessage: "Invalid email" };
  }

  return { valid: true };
}
