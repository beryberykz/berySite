import { Text } from "@medusajs/ui"

import { ProductPreviewType } from "types/global"

import { retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  region: Region
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((product) => product)

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })

  return (
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className="group "
    >
      <div>
        <Thumbnail
          thumbnail={productPreview.thumbnail}
          size="square"
          isFeatured={isFeatured}
        />
         <div className="border-b mt-5 pb-3">
    <div className="flex flex-col md:flex-row md:justify-between items-center">
      <Text className="text-xl font-bold text-ui-fg-subtle md:mb-0">{productPreview.title}</Text>
      {cheapestPrice &&  <PreviewPrice price={cheapestPrice} />}
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
  <div className="col-span-full mt-2 md:col-span-2">
    <p>
      Информация Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod laborum nemo quisquam quia facilis beatae ea omnis necessitatibus enim incidunt.
    </p>
  </div>

  <div className="mt-5 mb-5 md:col-span-1">
    <p className="text-gray-700 m-1">
      <strong>Характеристики</strong> Lorem ipsum dolor sit amet consectetur.
    </p>
    <p className="text-gray-700 m-1">
      <strong>Характеристики</strong> Lorem, ipsum.
    </p>
  </div>

  <div className="mt-5 mb-5 md:col-span-1">
    <p className="text-gray-700 m-1">
      <strong>Характеристики</strong> Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    </p>
    <p className="text-gray-700 m-1">
      <strong>Характеристики</strong> Lorem ipsum dolor, sit amet consectetur adipisicing.
    </p>
  </div>
</div>


        
      </div>
    </LocalizedClientLink>
  )
}
