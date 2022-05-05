import Head from "next/head";
import { FC } from "react";
import { Footer, Header } from "./";
import pages from "../../content/pages.json";
import siteData from "../../content/siteData.json";
import { Sidenav } from "./SideNav";

interface Props {
	title: string;
	pageDescription: string;
	imageFullUrl?: string;
	children: any;
}

export const Layout: FC<Props> = ({
	title,
	children,
	pageDescription,
	imageFullUrl
}) => {
	// const footer = data.footer;
	const page = pages.pages;
	// console.log(footer);
	const logo = siteData.logo;

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="keywords" />
				<meta name="description" content={pageDescription} />

				<meta property="og:title" content={title} />
				<meta property="og:description" content={pageDescription} />
				<meta property="og:type" content="og:product" />
				{imageFullUrl && <meta property="og:image" content={imageFullUrl} />}
			</Head>
			<Header navLink={page} logo={logo} />
			<Sidenav navLink={page} logo={logo} />
			<main>{children}</main>
			<Footer navLink={page} siteData={siteData} />
		</>
	);
};
