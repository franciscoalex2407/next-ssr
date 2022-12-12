import Link from "next/link";

export async function getStaticProps() {
  const data = await fetch(`https://api.mafin.com.br/api/catalogos`);
  const response = await data.json();
  const list = response.result;

  return {
    props: { list },
  };
}

export default function Menu(context: any) {
  console.log("Menu", context);

  const { list } = context;
  return (
    <>
      <h1>Nossos Menus.</h1>
      <ul>
        {list.map((item: any) => (
          <Link key={item.id} href={`/menu/${item.slug}`}>
            <li>{item.place_name}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}
