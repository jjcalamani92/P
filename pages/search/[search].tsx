import { Layout } from "../../src/components";
import { QueryLayout } from "../../src/layouts";
import { connectToDatabase } from "../../mongodb";
import { IProduct } from "../../interfaces";
import { GetServerSideProps, NextPage } from "next";

interface Props {
	products: IProduct[];
}

const SearchPage: NextPage<Props> = ({ products }) => {
	console.log(products);
	return (
		<Layout
			title={"Choco - Store"}
			pageDescription={"Encuentra tu ropa favorita"}
		>
			<QueryLayout
				products={products}
				isLoading={false}
				title={"resultados de la busqueda"}
			/>
		</Layout>
	);
};

const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
	term = term.toString().toLowerCase();
	const { db } = await connectToDatabase();
	const products = await db.collection("wearproducts").find({
		title: { term }
	});
	return products;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { query = "" } = params as { query: string };

	if (query.length === 0) {
		return {
			redirect: {
				destination: "/",
				permanent: true
			}
		};
	}

	let products = await getProductsByTerm(query);
	return {
		props: {
			products
		}
	};
};

export default SearchPage;
