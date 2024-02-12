import { ArrowUpRightMini } from "@medusajs/icons";
import { Text } from "@medusajs/ui";
import { NextPage } from "next"; // Используем NextPage вместо Metadata
import Link from "next/link";
import Head from "next/head"; // Импортируем компонент Head для управления мета-тегами

const NotFound: NextPage = () => {
  const title = "404 - Страница не найдена";
  const description = "Страница не существует. Вернитесь на главную страницу.";

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      {/* Добавляем компонент Head для управления мета-тегами */}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="404, страница не найдена, ошибка 404" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/static/images/404.png" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <link rel="alternate" hrefLang="en" href="https://www.example.com/en/404" />
        <script type="application/ld+json">
          {`{
            "@context": "http://schema.org",
            "@type": "ErrorPage",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.example.com/404"
            },
            "statusCode": "404"
          }`}
        </script>
      </Head>
      <h1 className="text-2xl-semi text-ui-fg-base">Страница не найдена</h1>
      <p className="text-small-regular text-ui-fg-base">
        Страница, на которую вы ссылаетесь, не существует. 
        Возможно, она была удалена или перемещена.
      </p>
      <Link href="/" passHref>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" aria-label="Вернуться на главную">
          Вернуться на главную
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
