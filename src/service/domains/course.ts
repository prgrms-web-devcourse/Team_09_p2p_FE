import Api from '~/service/core/Api';
import { CourseFilter } from '~/types/course';

class CourseApi extends Api {
  private path = '/courses';

  getCourses = async (filter?: CourseFilter) => {
    let filterList = ''; // 일단 전체 조회 할 수 있도록 처리
    if (filter) {
      filterList = `?${Object.entries(filter)
        .map((e) => e.join('='))
        .join('&')}`;
    }

    const response = await this.baseInstance.get(`${this.path}/${filterList}`);
    return response.data;
  };
}

export default new CourseApi();
