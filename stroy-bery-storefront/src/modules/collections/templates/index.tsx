import { ProductCollection } from "@medusajs/medusa"
import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import { getCollectionsList } from "@lib/data"
import {  clx } from "@medusajs/ui"

export default async function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: ProductCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1

  const fetchCollections = async () => {
    const { collections } = await getCollectionsList()
    return collections
  }

  const productCollections = await fetchCollections().then(
    (collections) => collections
  )

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <div>
      <RefinementList sortBy={sortBy || "created_at"} />
      {productCollections && productCollections.length > 0 && (
              <div className="flex flex-col gap-y-2 ml-6">
                <span className="txt-small-plus txt-ui-fg-base">
                  Все категории
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
                    {
                      "grid-cols-2": (productCollections?.length || 0) > 3,
                    }
                  )}
                >
                  {productCollections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
      </div>
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1>{collection.title}</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
