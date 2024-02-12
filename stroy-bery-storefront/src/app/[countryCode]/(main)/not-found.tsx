import Head from "next/head";
import { NextPage } from "next";
import InteractiveLink from "@modules/common/components/interactive-link";

const NotFound: NextPage = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100">
      <Head>
        <title>404 - Страница не найдена</title>
        <meta name="description" content="Страница не существует. Вернитесь на главную страницу." />
        <meta name="keywords" content="404, страница не найдена, ошибка 404" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="404 - Страница не найдена" />
        <meta property="og:description" content="Страница не существует. Вернитесь на главную страницу." />
        <meta property="og:image" content="/static/images/404.png" />
        <meta property="twitter:title" content="404 - Страница не найдена" />
        <meta property="twitter:description" content="Страница не существует. Вернитесь на главную страницу." />
        <link rel="alternate" hrefLang="ru" href="https://www.example.com/en/404" />
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
      <h1 className="text-2xl-semi text-ui-fg-base">Страница не существует</h1>
      <p className="text-small-regular text-ui-fg-base">
        Страница, на которую вы ссылаетесь, не существует. Вернитесь на главную страницу.
      </p>
      <InteractiveLink href="/" aria-label="Вернуться на главную страницу">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Вернуться на главную страницу
        </button>
      </InteractiveLink>
    </div>
  );
};

export default NotFound;
