import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';

type LinkProps = Omit<NextLinkProps, 'as' | 'passHref'> & { children: ReactNode };

const Link: React.FC<LinkProps> = ({
  href,
  prefetch,
  replace,
  scroll,
  shallow,
  locale,
  children,
  ...props
}) => {
  return (
    <NextLink
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
      prefetch={prefetch}
      passHref
      {...props}
    >
      <a>{children}</a>
    </NextLink>
  );
};

export default Link;
