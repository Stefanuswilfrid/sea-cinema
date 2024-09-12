import Head from "next/head";

type SEOProps = {
  title: string;
  desc: string;
};

const SEO = ({ title, desc }: SEOProps) => (
  <Head>
    <title>{title}</title>
    {/* Basic SEO Metadata */}
    <meta name="description" content={desc} />
    <meta name="keywords" content={"Cinema, Movie, Watch Movie, SEA Cinema"} />
    <meta name="generator" content="Next.js" />
    <meta name="application-name" content="SEA Cinema" />
    <meta name="category" content="Entertainment" />
    <link rel="canonical" href="https://sea-cinema-one.vercel.app/" />

    {/* Open Graph Metadata */}
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta name="og:description" property="og:description" content={desc} />
    <meta property="og:url" content={"https://sea-cinema-one.vercel.app/"} />
    <meta property="og:site_name" content="Proper Noun" />

    <meta property="og:image" content={"/images/compfest-logo.png"} />
    <meta property="og:image:width" content={"1200"} />
    <meta property="og:image:height" content={"630"} />
    <meta property="og:image:alt" content={"SEA Cinema Open Graph Image"} />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={desc} />
    <meta name="twitter:image" content={"/images/compfest-logo.png"} />

  </Head>
);
export default SEO;
