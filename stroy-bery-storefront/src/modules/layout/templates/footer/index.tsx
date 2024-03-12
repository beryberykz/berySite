import { Text, clx } from "@medusajs/ui"



import { getCategoriesList, getCollectionsList } from "@lib/data"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "../../components/medusa-cta"

const fetchCollections = async () => {
  const { collections } = await getCollectionsList()
  return collections
}

const fetchCategories = async () => {
  const { product_categories } = await getCategoriesList()
  return product_categories
}

export default async function Footer() {
  const productCollections = await fetchCollections().then(
    (collections) => collections
  )
  const productCategories = await fetchCategories().then(
    (categories) => categories
  )
  return (
    <footer className="border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
            >
             СТРОЙБЕРИ магазин
            </LocalizedClientLink>
          </div>
          
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
             
            {productCollections && productCollections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Категории
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
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">СТРОЙБЕРИ в соц. сетях</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <a
                    href="https://www.instagram.com/stroybery.kz/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@stroyberykz"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Тик-Ток
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/sroybery.kz/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-[#006039]">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} СТРОЙБЕРИ. Все права защищены.
          </Text>
          
        </div>
      </div>
    </footer>
  )
}
