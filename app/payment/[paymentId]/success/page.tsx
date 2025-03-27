import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import logoGhost from "@/assets/img/logo.png";
import Image from "next/image";

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

export default async function Success({
  params,
}: {
  params: Promise<{ paymentId: string }>;
}) {
  const { paymentId } = await params;
  const { method, amount, times, customer } = await fetchPaymentById(paymentId);
  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-4">
      <Image src={logoGhost} alt="logo" className="w-[200px] h-[42px]" />
      <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4 items-center w-full">
        <h1 className="text-lg font-bold text-center mt-2">
          Agradecemos a sua compra.
          <br />
          Pagamento aprovado com sucesso!
        </h1>

        <div className="w-full rounded-sm border-2 border-[#E5E5E5] p-2 ">
          <Badge>Informações comprador</Badge>
          <div className="px-4 pt-10 pb-8 space-y-4">
            <dl className="flex justify-between">
              <dt className="text-[#B2B2B2]">Nome comprador</dt>
              <dd>{customer.name}</dd>
            </dl>
            <dl className="flex justify-between">
              <dt className="text-[#B2B2B2]">E-mail comprador</dt>
              <dd>{customer.email}</dd>
            </dl>
            <dl className="flex justify-between">
              <dt className="text-[#B2B2B2]">Telefone comprador</dt>
              <dd>{customer.phone}</dd>
            </dl>
            <dl className="flex justify-between">
              <dt className="text-[#B2B2B2]">CPF comprador</dt>
              <dd>{customer.document}</dd>
            </dl>
          </div>
        </div>

        <div className="w-full rounded-sm border-2 border-[#E5E5E5] p-2 ">
          <Badge>Informações Pagamento</Badge>
          <div className="px-4 pt-10 pb-8 space-y-4">
            <dl className="flex justify-between">
              <dt className="text-[#B2B2B2]">Método de Pagamento</dt>
              <dd>{method === 0 ? "Pix" : "unknown"}</dd>
            </dl>
            <dl className="flex justify-between">
              <dt className="text-[#B2B2B2]">Parcelas</dt>
              <dd>{times}x</dd>
            </dl>
            <dl className="flex justify-between">
              <dt className="text-[#B2B2B2]">Sub total</dt>
              <dd>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(amount / 100)}
              </dd>
            </dl>
            <dl className="flex justify-between">
              <dt className="text-cherry-500">Total</dt>
              <dd className="text-cherry-500">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(amount / 100)}
              </dd>
            </dl>
          </div>
        </div>

        <div className="flex flex-col font-semibold text-[#B2B2B2] items-center">
          Identificador:
          <span className="font-bold text-black">{paymentId}</span>
        </div>
      </div>
    </div>
  );
}
