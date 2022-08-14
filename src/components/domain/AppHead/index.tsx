import Head from 'next/head';

const AppHead = () => {
  return (
    <Head>
      <title>우리의 여행코스 | 이곳저곳</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="이곳저곳" />
      <meta property="og:site_name" content="이곳저곳" />
      <meta property="og:url" content="https://team-09-p2p-fe.vercel.app/" />
      <meta property="og:image" content="/assets/images/og-image.png" />
      <meta property="og:description" content="다양한 여행 코스 정보를 확인할 수 있는 이곳저곳!" />
      {/* <link rel="icon" href="/assets/favicon/favicon.ico" /> */}
      <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
      <link rel="apple-touch-icon" sizes="57x57" href="/assets/favicon/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/assets/favicon/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/assets/favicon/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/assets/favicon/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/assets/favicon/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/assets/favicon/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/assets/favicon/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/assets/favicon/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-icon-180x180.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/assets/favicon/android-icon-192x192.png"
      />
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
    </Head>
  );
};

export default AppHead;
