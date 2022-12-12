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
  //   console.log("CategoriaPlace getServerSideProps", context);

  const { params } = context;
  const { placeSlug, categoriaSlug } = params;

  const data = await fetch(
    `https://api.mafin.com.br/api/catalogos/categoria/${categoriaSlug}?place_id=${placeSlug}`
  );
  const response = await data.json();
  const dados = response.result;

  return {
    props: { dados },
  };
}

export default function CategoriaPlace(context: any) {
  const { dados } = context;
  const products: any[] = dados.produtos;
  const place: any = dados.place;
  console.log("CategoriaPlace", dados);

  return (
    <>
      <h1>Produtos: {dados.nome_categoria}</h1>
      <ul>
        {products.map((item: any) => (
          <Link
            key={item.id}
            href={`/menu/${place.slug}/${dados.slug}/${item.slug}`}
          >
            <li>{item.nome_produto}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}
