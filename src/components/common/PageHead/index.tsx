import Head from 'next/head';

interface PageHeadProps {
  title: string;
  description?: string;
}

const PageHead = ({ title, description }: PageHeadProps) => {
  const metaTitle = `${title} | 이곳저곳`;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta property="og:title" content={metaTitle} />
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
        </>
      )}
    </Head>
  );
};

export default PageHead;
