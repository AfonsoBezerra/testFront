"use client";
import Image from "next/image";
import logoGhost from "@/assets/img/logo.png";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import shield from "@/assets/img/shield.png";
import icon from "@/assets/img/icon.png";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const mockValues = [
  {
    id: "1",
    type: "Pix",
    installment: "1",
    value: 30500,
    discount: 5,
  },
  {
    id: "2",
    type: "Cartão de crédito",
    installment: "1",
    value: 30500,
    discount: 0,
  },
  {
    id: "3",
    type: "Cartão de crédito",
    installment: "2",
    value: 15325,
    discount: 0,
  },
];

export default function Home() {
  const [selectPayment, setSelectPayment] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
    },
  });

  async function handleSubmit() {
    if (!selectPayment) return toast.error("Selecione uma forma de pagamento");
    const { email, nome, telefone } = form.getValues();
    const response = await fetch("http://localhost:3001/v1/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: 0,
        amount: 500,
        customer: {
          name: nome,
          email,
          phone: telefone,
          document,
        },
      }),
    });
    const { checkout } = await response.json();
    router.push(`/payment/${checkout.id}`);
  }

  const handleToggle = (id: string) => {
    setSelectPayment(id);
  };


  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-4">
      <div className="bg-[#CC0854] w-full min-h-[40px] flex justify-center items-center font-bold text-white">
        FRETE GRÁTIS ACIMA DE 200 REAIS
      </div>
      <Image src={logoGhost} alt="logo" className="w-[200px] h-[42px]" />
      <section className="max-w-2xl w-full mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 mt-5 w-full p-4"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Digite seu nome</FormLabel>
                  <Input
                    help={fieldState.error?.message}
                    onChange={(ev) => {
                      field.onChange(ev);
                    }}
                    error={!!fieldState.error}
                    name={field.name}
                    placeholder="Digite o seu nome"
                  />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Digite seu email</FormLabel>
                  <Input
                    help={fieldState.error?.message}
                    onChange={(ev) => {
                      field.onChange(ev);
                    }}
                    error={!!fieldState.error}
                    name={field.name}
                    placeholder="Digite o seu email"
                  />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="telefone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Digite seu telefone</FormLabel>
                  <Input
                    help={fieldState.error?.message}
                    error={!!fieldState.error}
                    onChange={(ev) => {
                      field.onChange(ev);
                    }}
                    name={field.name}
                    placeholder="Digite o seu telefone"
                  />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="cpf"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Digite seu CPF</FormLabel>
                  <Input
                    help={fieldState.error?.message}
                    error={!!fieldState.error}
                    onChange={(ev) => {
                      field.onChange(ev);
                    }}
                    name={field.name}
                    placeholder="Digite o seu CPF"
                  />
                </FormItem>
              )}
            ></FormField>
            <h1 className="text-lg font-bold text-center">
              João, como você quer pagar?
            </h1>
            <div className="w-full flex flex-col gap-4">
              <RadioGroup defaultValue="comfortable">
                {mockValues.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggle(item.id)}
                    className={cn(
                      "w-full bg-white border-2 relative border-[#E5E5E5] rounded-md h-full flex-col gap-2 p-2",
                      selectPayment === item.id &&
                        "bg-[#FFF0F6] border-[#CC0854]"
                    )}
                  >
                    <Badge>{item.type}</Badge>
                    <div
                      className={cn(
                        "absolute top-5 right-5 w-6 h-6 rounded-full flex items-center justify-center bg-transparent border-2 border-[#E5E5E5]",
                        selectPayment === item.id &&
                          "bg-[#CC0854] border-[#CC0854]"
                      )}
                    >
                      {selectPayment === item.id && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex gap-2 items-center text-2xl">
                      <span className="font-bold">{item.installment}x</span>
                      <span>
                        {item.value.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>
                    {item.discount ? (
                      <>
                        <span className="text-sm text-[#CC0854]">
                          Ganhe 5% de desconto
                        </span>
                        <div className="w-full h-[33px] bg-[#54052D] text-white text-sm flex items-center gap-1 p-2 rounded-md mt-2">
                          🤑 <span className="font-bold">R$ 300,00</span> de
                          desconto no seu Pix
                        </div>
                      </>
                    ) : null}
                    <RadioGroupItem
                      className="absolute hidden"
                      value="default"
                      id="r1"
                    />
                  </div>
                ))}
              </RadioGroup>
              <Button
                type="submit"
                className="w-full py-2 bg-[#CC0854] font-bold text-white h-[50px]"
              >
                Finalizar Pagamento
              </Button>
            </div>
          </form>
        </Form>
      </section>
      <div className="flex items-center gap-2 font-semibold text-[#B2B2B2]">
        <Image src={shield} alt="shield" className="size-4" />
        Pagamento 100% seguro via:
        <Image src={icon} alt="icon" className="size-4" />
      </div>
    </div>
  );
}
