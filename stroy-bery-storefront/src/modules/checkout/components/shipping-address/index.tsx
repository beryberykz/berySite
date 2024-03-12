import React, { useState, useEffect, useMemo } from "react"
import { Address, Cart, Customer } from "@medusajs/medusa"
import Checkbox from "@modules/common/components/checkbox"
import Input from "@modules/common/components/input"
import AddressSelect from "../address-select"
import CountrySelect from "../country-select"
import { Container } from "@medusajs/ui"

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
  countryCode,
  formData,
  setFormData,
}: {
  customer: Omit<Customer, "password_hash"> | null
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
  checked: boolean
  onChange: () => void
  countryCode: string
  formData:any
  setFormData: any
}) => {
  
  const countriesInRegion = useMemo(
    () => cart?.region.countries.map((c) => c.iso_2),
    [cart?.region]
  )

  // check if customer has saved addresses that are in the current region
  const addressesInRegion = useMemo(
    () =>
      customer?.shipping_addresses.filter(
        (a) => a.country_code && countriesInRegion?.includes(a.country_code)
      ),
    [customer?.shipping_addresses, countriesInRegion]
  )
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <>
      {customer && (addressesInRegion?.length || 0) > 0 && (
        <Container className="mb-6 flex flex-col gap-y-4 p-5">
          <p className="text-small-regular">
            {`Здраствуйте ${customer.first_name}, хотите использовать ваш сохранённый адрес?`}
          </p>
          <AddressSelect addresses={customer.shipping_addresses} cart={cart} />
        </Container>
      )}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Имя"
          name="shipping_address.first_name"
          autoComplete="given-name"
          value={formData["shipping_address.first_name"]}
          onChange={handleChange}
          required
        />
        <Input
          label="Фамилия"
          name="shipping_address.last_name"
          autoComplete="family-name"
          value={formData["shipping_address.last_name"]}
          onChange={handleChange}
          required
        />
        <Input
          label="Адресс"
          name="shipping_address.address_1"
          autoComplete="address-line1"
          value={formData["shipping_address.address_1"]}
          onChange={handleChange}
          required
        />
        <CountrySelect
          name="shipping_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={formData["shipping_address.country_code"]}
          onChange={handleChange}
          required
        />
      </div>
      <div className="my-8">
        <Checkbox
          label="Адресс доставки совпдает с платёжным адрессом"
          name="same_as_billing"
          checked={checked}
          onChange={onChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Input
          label="Электронная Почта"
          name="email"
          type="email"
          title="Enter a valid email address."
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Телефон"
          name="shipping_address.phone"
          autoComplete="tel"
          value={formData["shipping_address.phone"]}
          onChange={handleChange}
        />
      </div>
    </>
  )
}

export default ShippingAddress
