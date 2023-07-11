import Head from "next/head";

type SEOProps = {
  title: string;
  desc: string;
};

const SEO = ({ title, desc }: SEOProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={desc} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta name="og:description" property="og:description" content={desc} />
    <meta property="og:site_name" content="Proper Noun" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={desc} />
  </Head>
);
export default SEO;
