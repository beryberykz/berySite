import { Text, clx } from "@medusajs/ui"

import { PriceType } from "../product-actions"

export default async function PreviewPrice({ price }: { price: PriceType }) {
  return (
    <>
      {price.price_type === "sale" && (
        <Text className="line-through text-black">
          {price.original_price}
        </Text>
      )}
      <Text
        className={clx(
          "text-black",
          {
            "text-ui-fg-interactive": price.price_type === "sale",
          },
          "text-xl"
        )}
      >
        {price.calculated_price}
      </Text>
    </>
  )
}
