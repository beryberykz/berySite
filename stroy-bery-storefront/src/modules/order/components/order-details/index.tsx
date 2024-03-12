import { Order } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: Order
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div>
      <Text>
      Спасибо, что оставили свой номер телефона. Мы свяжемся с вами в течение 30 минут, чтобы ответить на ваши вопросы и помочь с оформлением заказа.{" "}
        <span className="text-ui-fg-medium-plus font-semibold">
          {order.shipping_address.phone}
        </span>
        .
      </Text>
      <Text className="mt-2">
        Дата Заказа: {new Date(order.created_at).toDateString()}
      </Text>
      <Text className="mt-2 text-ui-fg-interactive">
        Номер Заказа: {order.display_id}
      </Text>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text>
              Статус заказа:{" "}
              <span className="text-ui-fg-subtle ">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text>
              Статус оплаты:{" "}
              <span className="text-ui-fg-subtle ">
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
