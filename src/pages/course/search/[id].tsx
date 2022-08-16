import type { NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PageContainer } from '~/components/atom';
import { CategoryTitle, CourseList, SortFilter } from '~/components/common';
import { CourseApi, PlaceApi } from '~/service';
import { SortType } from '~/types/course';
import { isNumber } from '~/utils/converter';

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const placeId = Number(query.id);
  if (!isNumber(placeId)) {
    return {
      notFound: true
    };
  }

  return {
    props: { placeId }
  };
};

interface Props {
  placeId: number;
}

const CourseSearch = ({ placeId }: Props) => {
  const [courseList, setCourseList] = useState([]);
  const [page, setPage] = useState(0);
  const [lastTarget, setLastTarget] = useState(null);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeName, setPlaceName] = useState('');

  const [sorting, setSorting] = useState<SortType>('인기순');

  const SIZE = 15;
  const router = useRouter();

  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && !isLoading && !isLast) {
        getCourseList({ page: page + 1, sorting });
        setPage((prev) => prev + 1);

        observer.unobserve(entry.target);
      }
      if (isLast) {
        observer.disconnect();
      }
    });
  };

  const getPageInfo = async () => {
    try {
      const result = await PlaceApi.read(placeId);
      setPlaceName(result.name);
      await getCourseList({ page: 0, sorting: sorting });
    } catch (e) {
      router.push('/404');
    }
  };

  const getCourseList = async (filter: { page: number; sorting: SortType }) => {
    setIsLoading(true);

    const result = await CourseApi.search({ ...filter, placeId, size: SIZE });

    if (page === 0) {
      setCourseList(result.content);
    } else {
      setCourseList(courseList.concat(result.content));
    }

    if (result.last) {
      setIsLast(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (lastTarget) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0 });
      observer.observe(lastTarget);
    }
    return () => observer && observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastTarget]);

  useEffect(() => {
    getPageInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSort = (value: SortType) => {
    getCourseList({ page: 0, sorting: value });
    setSorting(value);
  };

  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ position: 'relative' }}>
        <PageContainer>
          <CategoryTitle name={`#${placeName}`} />

          <SortFilter initialValue={sorting} onSort={handleSort} />
          <CourseList courses={courseList} ref={setLastTarget} />
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default CourseSearch;
