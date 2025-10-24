export interface User {
  id: number;
  name: string;
  email?: string;
  password?: string;
  branch: string;
  role: "gerente" | "estoquista";
  image: string;
  createdAt: string;
}
