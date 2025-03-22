import { z } from "zod";

export const formSchema = z.object({
  nome: z.string().min(1, {
    message: "Campo obrigatorio.",
  }),
  email: z
    .string({
      required_error: "Campo obrigatório.",
    })
    .email({
      message: "Email inválido.",
    })
    .min(1, "Campo obrigatório."),
  telefone: z.string().min(1, {
    message: "Campo obrigatorio.",
  }),
  cpf: z.string().min(2, {
    message: "Campo obrigatorio.",
  }),
});
