import Head from "next/head";
import Link from "next/link";

// export async function getStaticPaths() {
//   const data = await fetch("https://api.mafin.com.br/api/catalogos");
//   const response = await data.json();
//   const dados = response.result;

//   const paths = dados.map((item: any) => {
//     return {
//       params: {
//         placeSlug: `${item.slug}`,
//       },
//     };
//   });

//   return {
//     paths: paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { placeSlug } = params;

  const data = await fetch(
    `https://api.mafin.com.br/api/catalogos/${placeSlug}`
  );
  const response = await data.json();
  const place = response.result;

  return {
    props: { place },
  };
}

export default function MenuPlace(context: any) {
  const { place } = context;

  return (
    <>
      <Head>
        <title>{place.place_name}</title>
        <meta property="og:image" content={place.foto} />
      </Head>
      <h1>Catalogo {place.place_name}</h1>
      <ul>
        {place.categorias.map((category: any) => (
          <Link key={category.id} href={`${place.slug}/${category.slug}`}>
            <li>{category.nome_categoria}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}
