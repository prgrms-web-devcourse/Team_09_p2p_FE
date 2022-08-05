import Api from '~/service/core/Api';

class CourseApi extends Api {
  private path = '/courses';

  // sample
  // create = async (data:...) => {
  //   const response = await this.authInstance(`${this.path}`, data);
  //   ...
  // };
}

export default new CourseApi();
