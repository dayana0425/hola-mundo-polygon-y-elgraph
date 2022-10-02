import Head from "next/head";

function Header() {
  return (
    <Head>
      <title>Hola Mundo</title>
      <meta
        name="description"
        content="Un proyecto inicial para configurar rápidamente la creación de tu DApp en Polygon y The Graph! 🚀"
      />
      <link rel="icon" href="/HolaMundo-NoText.png" />
      <meta property="og:title" content="Hola Mundo" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="" />
      <meta property="og:site_name" content="Hola Mundo"></meta>
    </Head>
  );
}

export default Header;
