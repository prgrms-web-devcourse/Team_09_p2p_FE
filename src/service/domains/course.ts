import Api from '~/service/core/Api';
import { CourseFilter } from '~/types/course';

class CourseApi extends Api {
  private path = '/courses';

  // sample
  // create = async (data:...) => {
  //   const response = await this.authInstance(`${this.path}`, data);
  //   ...
  // };

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
