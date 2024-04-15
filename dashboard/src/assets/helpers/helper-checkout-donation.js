import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import P from "../../Components/Partials/P";

function handleCheckoutPayment(
  donationAmount,
  setResolvePayment,
  setStatusPayment
) {
  initMercadoPago("TEST-acdcebc1-d353-43dd-a35a-236e4f739f8a", {
    locale: "es-AR",
  });

  const initialization = {
    amount: donationAmount,
    preferenceId: "1",
  };
  const customization = {
    paymentMethods: {
      ticket: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
      minInstallments: 1,
      maxInstallments: 12,
    },
  };
  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    const urlCheckoutPayment = "http://localhost:3001/api/checkout-donation";

    // callback llamado al hacer clic en el botón enviar datos
    return new Promise((resolve, reject) => {
      fetch(urlCheckoutPayment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          window.paymentBrickController.unmount();
          // recibir el resultado del pago
          resolve(response.id);
          setResolvePayment(response.id);
          setStatusPayment(response.status);
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
          reject();
        });
    });
  };
  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
   Callback llamado cuando el Brick está listo.
   Aquí puede ocultar cargamentos de su sitio, por ejemplo.
 */
  };
  if (window.navigator.onLine === false) {
    return <P pText="Verifique la conexión a internet" />;
  }
  return (
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
    />
  );
}
export { handleCheckoutPayment };
