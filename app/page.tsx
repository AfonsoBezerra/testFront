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
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import shield from "@/assets/img/shield.png";
import icon from "@/assets/img/icon.png";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import qrCode from "@/assets/img/qrcode.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

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
  const [stepp, setStepp] = useState(1);
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

  function handleSubmit() {
    if (!selectPayment) return toast.error("Selecione uma forma de pagamento");
    setStepp((prev) => prev + 1);
  }

  const handleToggle = (id: string) => {
    setSelectPayment(id);
  };

  function copy() {
    toast.success('Copiado para area de transferencia')
    setTimeout(() => {
      setStepp(3)
    }, 5000)
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-4">
      <div className="bg-[#CC0854] w-full min-h-[40px] flex justify-center items-center font-bold text-white">
        FRETE GRÁTIS ACIMA DE 200 REAIS
      </div>
      <Image src={logoGhost} alt="logo" className="w-[200px] h-[42px]" />
      
      {stepp == 1 && (
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
      )}

      {stepp == 2 && (
        <div className="p-4 flex flex-col gap-4 items-center w-full">
          <h1 className="text-lg font-bold text-center max-w-[250px] mt-2">
            João, faça o pagamento de R$ 30.500,00 pelo Pix
          </h1>
          <div className="border-2 rounded-lg border-[#CC0854] overflow-hidden h-[332px]">
            <Image
              src={qrCode}
              className="w-full h-full object-cover"
              alt="qrcode"
            />
          </div>
          <Button className="w-[90%] bg-[#54052D] flex items-center gap-2" onClick={copy}>
            Clique para copiar QR CODE <Copy className="size-4 text-white" />
          </Button>
          <div className="flex flex-col font-semibold text-[#B2B2B2]">
            Prazo de pagamento:
            <span className="font-bold text-black">20/03/2025 - 08:17</span>
          </div>
          <Separator />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Como funciona?</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <Badge className="bg-[#54052D] font-light uppercase rounded-sm">
                      Passo 1
                    </Badge>
                    Abra o app do seu banco e entre no ambiente Pix;
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Badge className="bg-[#54052D] font-light uppercase rounded-sm">
                      Passo 2
                    </Badge>
                    Escolha Pagar com QR Code e aponte a câmera para o código
                    acima, ou cole o código identificador da transação;
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Badge className="bg-[#54052D] font-light uppercase rounded-sm">
                      Passo 3
                    </Badge>
                    Confirme as informações e finalize sua compra.
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator />
          <div className="flex flex-col font-semibold text-[#B2B2B2] items-center">
            Identificador:
            <span className="font-bold text-black">
              2c1b951f356c4680b13ba1c9fc889c47
            </span>
          </div>
        </div>
      )}

      {stepp == 3 && (
        <div className="p-4 flex flex-col gap-4 items-center w-full">
          <h1 className="text-lg font-bold text-center mt-2">
            Agradecemos a sua compra.
            <br />
            Pagamento aprovado com sucesso!
          </h1>

          <div className="w-full rounded-sm border-2 border-[#E5E5E5] p-2 ">
            <Badge>Informações comprador</Badge>
            <ul className="flex flex-col gap-4 mt-4">
              <li className="flex justify-between items-center text-[#B2B2B2]">
                  Nome comprador
                  <span className="font-bold text-black">João Almeida</span>
              </li>
              <li className="flex justify-between items-center text-[#B2B2B2]">
                  Email comprador
                  <span className="font-bold text-black">joaoalmeida22@gmail.com</span>
              </li>
              <li className="flex justify-between items-center text-[#B2B2B2]">
                  Telefone comprador
                  <span className="font-bold text-black">+55 (19) 99542-4903</span>
              </li>
              <li className="flex justify-between items-center text-[#B2B2B2]">
                  CPF comprador
                  <span className="font-bold text-black">424.460.212.43</span>
              </li>
            </ul>
          </div>

          <div className="w-full rounded-sm border-2 border-[#E5E5E5] p-2 ">
            <Badge>Informações Pagamento</Badge>
            <ul className="flex flex-col gap-4 mt-4">
              <li className="flex justify-between items-center text-[#B2B2B2]">
                  Método de pagamento
                  <span className="font-bold text-black">Pix</span>
              </li>
              <li className="flex justify-between items-center text-[#B2B2B2]">
                  Email comprador
                  <span className="font-bold text-black">joaoalmeida22@gmail.com</span>
              </li>
              <li className="flex justify-between items-center text-[#B2B2B2]">
                  Parcelas
                  <span className="font-bold text-black">1x</span>
              </li>
              <li className="flex justify-between items-center text-[#B2B2B2]">
                  Sub total
                  <span className="font-bold text-black">R$ 30.500,00</span>
              </li>
              <li className="flex justify-between items-center text-[#CC0854]">
                  Total
                  <span className="font-bold">R$ 30.200,00</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col font-semibold text-[#B2B2B2] items-center">
            Identificador:
            <span className="font-bold text-black">
              2c1b951f356c4680b13ba1c9fc889c47
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 font-semibold text-[#B2B2B2]">
        <Image src={shield} alt="shield" className="size-4" />
        Pagamento 100% seguro via:
        <Image src={icon} alt="icon" className="size-4" />
      </div>
    </div>
  );
}
