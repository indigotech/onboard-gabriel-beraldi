export interface User {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  phone: string;
  role: "admin" | "user";
}
