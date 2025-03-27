import { toDataURL } from "qrcode";
import Image from "next/image";
import { toast } from "react-toastify";
import qrCode from "@/assets/img/qrcode.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notFound, redirect } from "next/navigation";
import logoGhost from "@/assets/img/logo.png";

async function fetchPaymentById(id: string) {
  const response = await fetch(`http://localhost:3001/v1/payment/${id}`, {
    method: "GET",
  });

  if (response.status === 404) {
    return notFound();
  }

  const { payment } = await response.json();
  return payment;
}

export default async function payment({
  params,
}: {
  params: Promise<{ paymentId: string }>;
}) {
  const { paymentId } = await params;
  const payment = await fetchPaymentById(paymentId);
  const data = await toDataURL(payment?.url, { width: 320, margin: 0 });

  if (payment.status === 1) {
    redirect(`/payment/${paymentId}/success`);
  }

  const amount = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(payment.amount / 100);

  function copy() {
    toast.success("Copiado para area de transferencia");
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-4">
      <div className="bg-[#CC0854] w-full min-h-[40px] flex justify-center items-center font-bold text-white">
        FRETE GRÁTIS ACIMA DE 200 REAIS
      </div>
      <Image src={logoGhost} alt="logo" className="w-[200px] h-[42px]" />
      <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4 items-center w-full">
        <h1 className="text-lg font-bold text-center max-w-[250px] mt-2">
          {payment.customer.name}, faça o pagamento de {amount} pelo Pix
        </h1>
        <div className="border-2 rounded-lg border-[#CC0854] overflow-hidden h-[332px]">
          <Image src={data} width={320} height={320} alt="#" />
        </div>
        <Button
          className="w-[90%] bg-[#54052D] flex items-center gap-2"
          onClick={copy}
        >
          Clique para copiar QR CODE <Copy className="size-4 text-white" />
        </Button>
        <div className="flex flex-col font-semibold text-[#B2B2B2]">
          Prazo de pagamento:
          <span className="font-bold text-black">
            {Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(
              new Date(payment.expiresAt)
            )}{" "}
            -{" "}
            {new Date(payment.expiresAt).getHours().toString().padStart(2, "0")}
            :
            {new Date(payment.expiresAt)
              .getMinutes()
              .toString()
              .padStart(2, "0")}
          </span>
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
          <span className="font-bold text-black">{paymentId}</span>
        </div>
      </div>
    </div>
  );
}
