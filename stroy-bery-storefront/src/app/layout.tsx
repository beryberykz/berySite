import { Metadata } from "next"
import "styles/globals.css"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title:'Купить поликарбонат и теплицы в Караганде, Астане, Алма-Ате Шымкенте, Павлодаре, Усть-Каменогорске  - СтройБери',
  description: 'Широкий выбор поликарбоната и теплиц в Караганде, Астане, Алма-Ате, Шымкенте, Павлодаре, Усть-Каменогорске и других городах от компании СтройБери. У нас вы найдете сотовый, монолитный, профилирующий поликарбонат, а также высококачественные теплицы и навесы. Закажите прямо сейчас!',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
