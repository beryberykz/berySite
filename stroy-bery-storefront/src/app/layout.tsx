import { Metadata } from "next"
import "styles/globals.css"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: "СтройБери: Заказать теплицы поликарбонат в Караганде, Астане, Алматы",
    description: "Широкий выбор теплиц из поликарбоната по доступным ценам. Доставка в Караганду, Астану, Алматы, Шымкент, Павлодар, Усть-Каменогорск и другие города. Закажите прямо сейчас!",
    keywords: ["купить теплицу", "Сад", "дорого", "дёшево","теплицы из поликарбоната", "поликарбонат цена", "готовые теплицы", "монтаж теплиц", "Дача", "цена теплицы", "поликарбонат", "сотовый поликарбонат", "монолитный поликарбонат", "профилированный поликарбонат",  "СтройБери Караганда", "СтройБери Астана", "СтройБери Алматы", "СтройБери Шымкент", "СтройБери Павлодар", "СтройБери Усть-Каменогорск","овощи",],
  };
  

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
