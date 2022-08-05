import Api from '~/service/core/Api';

class CourseApi extends Api {
  private path = '/courses';

  getCourses = async () => {
    const response = await this.baseInstance.get(`${this.path}`);
    return response;
  };

  // sample
  // create = async (data:...) => {
  //   const response = await this.authInstance(`${this.path}`, data);
  //   ...
  // };
}

export default new CourseApi();
