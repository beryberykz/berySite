"use client"

import {
  useSearchParams,
  useRouter,
  usePathname,
  useParams,
} from "next/navigation"
import { Cart, Customer } from "@medusajs/medusa"
import { CheckCircleSolid } from "@medusajs/icons"
import { Heading, Text, useToggleState } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"

import BillingAddress from "../billing_address"
import ShippingAddress from "../shipping-address"
import { setAddresses } from "../../actions"
import { SubmitButton } from "../submit-button"
import { useFormState } from "react-dom"
import ErrorMessage from "../error-message"
import compareAddresses from "@lib/util/compare-addresses"
import { useEffect, useState } from "react"

const Addresses = ({
  cart,
  customer,
  
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
  customer: Omit<Customer, "password_hash"> | null
  
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const countryCode = params.countryCode as string

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsSBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useFormState(setAddresses, null)

  const [formData, setFormData] = useState({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.last_name": cart?.shipping_address?.last_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.company": cart?.shipping_address?.company || "",
    "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
    "shipping_address.city": cart?.shipping_address?.city || "",
    "shipping_address.country_code":
      cart?.shipping_address?.country_code || countryCode || "",
    "shipping_address.province": cart?.shipping_address?.province || "",
    email: cart?.email || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
  })
  

  useEffect(() => {
    setFormData({
      "shipping_address.first_name": cart?.shipping_address?.first_name || "",
      "shipping_address.last_name": cart?.shipping_address?.last_name || "",
      "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
      "shipping_address.company": cart?.shipping_address?.company || "",
      "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
      "shipping_address.city": cart?.shipping_address?.city || "",
      "shipping_address.country_code":
        cart?.shipping_address?.country_code || "",
      "shipping_address.province": cart?.shipping_address?.province || "",
      email: cart?.email || "",
      "shipping_address.phone": cart?.shipping_address?.phone || "",
    })
  }, [cart?.shipping_address, cart?.email])

  

  const sendDataToBitrix = (formData: { [x: string]: string }) => {
    
    
    let queryUrl =
      "https://stroybery.bitrix24.ru/rest/32031//crm.lead.add.json"

    // Формирование данных для отправки
    let queryData = new URLSearchParams()
    queryData.append(
      "fields[NAME]",
      formData["shipping_address.first_name"]
    )
    queryData.append(
      "fields[LAST_NAME]",
      formData["shipping_address.last_name"]
    )
    
    queryData.append(
      "fields[PHONE][0][VALUE]",
      formData["shipping_address.phone"]
    )

    queryData.append(
      "fields[ADDRESS][0][STREET]",
      formData["shipping_address.address_1"]
    )
    queryData.append(
      "fields[ADDRESS][0][COUNTRY_CODE]",
      formData["shipping_address.first_name"]
    )

    if (typeof cart?.total === 'number') {
      const totalAmount = cart?.total / 100; // Деление на 100 для преобразования 1200 в 12 (ровную суму без чисел после , )
      queryData.append(
          "fields[COMMENTS]",
          cart!.items
              .map(items => ({
                  Вариант: items.description,
                  Товар: items.title,
                  Количество: items.quantity
              }))
              .map(obj => ` Товар: ${obj.Товар}, Вариант: ${obj.Вариант}, Количество: ${obj.Количество} `)
              .join(',\n') + `\nСумма: ` + totalAmount
      );
  } else {
      console.error('Сумма не является числом или не определена.');
  }
  
     
    queryData.append(
      "fields[SOURCE_ID]",
      'другое 16TEST'
    )
    queryData.append(
      "fields[ID]",
      'ТестовыйСайт1'
    )
    queryData.append(
      "fields[TITLE]",
      'ТестовыйСайтTitle'
    )
    

    fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: queryData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при отправке данных на сервер Bitrix24")
        }
        return response.json()
      })
      .catch((error) => {
        console.error("Ошибка:", error)
        throw new Error("Ошибка при отправке данных на сервер Bitrix24")
      })
    console.log(cart)
    console.log(formData)
    const queryParams = {};
    for (const [key, value] of queryData) {
    queryParams[key] = value;
}
console.log(queryParams);
  }

  const handleClick = () => {
    sendDataToBitrix(formData);
  }

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
        >
          Адресс
          {!isOpen && <CheckCircleSolid />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
            >
              Изменить
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              countryCode={countryCode}
              checked={sameAsSBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
              setFormData={setFormData}
              formData={formData}
            />

            {!sameAsSBilling && (
              <div>
                <Heading
                  level="h2"
                  className="text-3xl-regular gap-x-4 pb-6 pt-8"
                >
                  Адрес для выставления счета
                </Heading>

                <BillingAddress cart={cart} countryCode={countryCode} />
              </div>
            )}
          <SubmitButton sendDataToBitrix={sendDataToBitrix} handleClick={handleClick} className="mt-6">
  Перейти к Доставке
</SubmitButton>
            <ErrorMessage error={message} />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex items-start gap-x-1 w-full sxsmall:flex-col  mxsmall:flex-row">
                  <div className="flex flex-col w-1/3">
                    <Text className="txt-medium-plus text-ui-fg-base mb-1">
                      Адресс доставки
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>

                  <div className="flex flex-col w-1/3 ">
                    <Text className="txt-medium-plus text-ui-fg-base mb-1">
                      Контакты
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.phone}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.email}
                    </Text>
                  </div>

                  <div className="flex flex-col w-1/3">
                    <Text className="txt-medium-plus text-ui-fg-base mb-1">
                    Адрес для выставления счета
                    </Text>

                    {sameAsSBilling ? (
                      <Text className="txt-medium text-ui-fg-subtle">
                        Адресс доставки и расчётный адресс один
                      </Text>
                    ) : (
                      <>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address.first_name}{" "}
                          {cart.billing_address.last_name}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address.address_1}{" "}
                          {cart.billing_address.address_2}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address.postal_code},{" "}
                          {cart.billing_address.city}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address.country_code?.toUpperCase()}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Addresses
