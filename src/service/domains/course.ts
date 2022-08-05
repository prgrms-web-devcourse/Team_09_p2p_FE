import Api from '~/service/core/Api';

class CourseApi extends Api {
  private path = '/courses';

  // sample
  // create = async (data:...) => {
  //   const response = await this.authInstance(`${this.path}`, data);
  //   ...
  // };

  getCourses = async (filter) => {
    const queryString = Object.entries(filter)
      .map((e) => e.join('='))
      .join('&');
    const response = await this.baseInstance.get(`${this.path}/?${queryString}`);
    return response.data;
  };
}

export default new CourseApi();
