import Api from '~/service/core/Api';
import { CourseFilter } from '~/types/course';
import { ObjectToQuery } from '~/utils/converter';

class CourseApi extends Api {
  private path = '/courses';

  getCourses = async (filter?: CourseFilter) => {
    let queryString = ''; // 일단 전체 조회 할 수 있도록 처리
    if (filter !== undefined) {
      queryString = ObjectToQuery(filter);
    }

    const response = await this.baseInstance.get(`${this.path}/${queryString}`);
    return response.data;
  };
}

export default new CourseApi();
