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
            <Text className="text-xl font-bold text-[#006039] md:mb-0">
              {productPreview.title}
            </Text>
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="sxsmall:hidden msmall:block border-b col-span-full xl:h-32 h mt-2 md:col-span-2">
            <p>{productPreview.description || "No description available"}</p>
          </div>
          {/* Первая колонка */}
          <div className="md:col-span-1">
            {typeof productPreview.metadata === "object" &&
              productPreview.metadata !== null &&
              Object.entries(productPreview.metadata)
                .slice(
                  0,
                  Math.ceil(Object.keys(productPreview.metadata).length / 2)
                )
                .map(([key, value]) => (
                  <div key={key} className="mt-1 mb-1 w-full">
                    {/* Добавлен класс w-full */}
                    <p className="text-gray-700 m-1">
                      <strong>{key}</strong>: {String(value)}
                    </p>
                  </div>
                ))}
          </div>

          {/* Вторая колонка */}
          <div className="md:col-span-1">
            {typeof productPreview.metadata === "object" &&
              productPreview.metadata !== null &&
              Object.entries(productPreview.metadata)
                .slice(
                  Math.ceil(Object.keys(productPreview.metadata).length / 2)
                )
                .map(([key, value]) => (
                  <div key={key} className="mt-1 mb-1 w-full">
                    {/* Добавлен класс w-full */}
                    <p className="text-gray-700 m-1">
                      <strong>{key}</strong>: {String(value)}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
