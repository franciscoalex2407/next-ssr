import Head from "next/head";
import Link from "next/link";

// export async function getServerSideProps(context: any) {
//   console.log("CategoriaPlace getServerSideProps", context);

//   //   const data = await fetch("https://api.mafin.com.br/api/catalogos");
//   //   const response = await data.json();
//   //   const dados = response.result;

//   const paths = [].map((item: any) => {
//     return {
//       params: {
//         categoriaSlug: `${item.slug}`,
//       },
//     };
//   });

//   return {
//     paths: paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps(context: any) {
  console.log("ProductPlace getServerSideProps", context);

  const { params } = context;
  const { placeSlug, productSlug } = params;

  const url = `https://api.mafin.com.br/api/catalogos/product/${productSlug}?place_id=${placeSlug}`;
  const data = await fetch(url);
  const response = await data.json();

  const dados = response.result ?? {};

  return {
    props: { dados },
  };
}

export default function ProductPlace(context: any) {
  const { dados } = context;

  return (
    <>
      <Head>
        <title>{dados.nome_produto}</title>
        <meta property="og:image" content={dados.foto} />
      </Head>
      <h1>Produto: {dados.nome_produto}</h1>
    </>
  );
}
