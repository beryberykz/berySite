import { Product } from "@medusajs/medusa"
import { Metadata } from "next"

import { clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getCollectionsList, getProductsList } from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getRegion } from "app/actions"
import { ProductCollectionWithPreviews } from "types/global"

const fetchCollections = async () => {
  const { collections } = await getCollectionsList()
  return collections
}

export const metadata: Metadata = {
  title: "Купить поликарбонат и теплицы в Караганде, Астане, Алма-Ате и других городах - СтройБери",
  description:
    "Широкий выбор поликарбоната и теплиц в Караганде, Астане, Алма-Ате, Шымкенте, Павлодаре, Усть-Каменогорске и других городах от компании СтройБери. У нас вы найдете сотовый, монолитный, профилирующий поликарбонат, а также высококачественные теплицы и навесы. Закажите прямо сейчас!",
}

const getCollectionsWithProducts = async (
  countryCode: string
): Promise<ProductCollectionWithPreviews[] | null> => {
  const { collections } = await getCollectionsList().then(
    (collections) => collections
  )

  if (!collections) {
    return null
  }

  const collectionIds = collections.map((collection) => collection.id)

  await Promise.all(
    collectionIds.map((id) =>
      getProductsList({
        queryParams: { collection_id: [id] },
        countryCode,
      })
    )
  ).then((responses) =>
    responses.forEach(({ response, queryParams }) => {
      let collection

      if (collections) {
        collection = collections.find(
          (collection) => collection.id === queryParams?.collection_id?.[0]
        )
      }

      if (!collection) {
        return
      }

      collection.products = response.products as unknown as Product[]
    })
  )

  return collections as unknown as ProductCollectionWithPreviews[]
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  const productCollections = await fetchCollections().then(
    (collections) => collections
  )

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        {productCollections && productCollections.length > 0 && (
          <div className="content-container py-12 small:py-24">
            <div className="flex flex-col gap-y-2">
              <span className="text-3xl">
                Наши категории
              </span>
              <ul
                className={clx(
                  "grid grid-cols-1 gap-6 text-ui-fg-subtle text-xl",
                  {
                    "grid-cols-2": (productCollections?.length || 0) > 3,
                  }
                )}
              >
                {productCollections?.slice(0, 6).map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      className="hover:text-ui-fg-base "
                      href={`/collections/${c.handle}`}
                    >
                      {c.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
        
        
      </div>
    </>
  )
}
