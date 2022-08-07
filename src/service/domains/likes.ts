import Api from '~/service/core/Api';

class LikesApi extends Api {
  private path = '/likes';

  likeCourse = async (courseId: number) => {
    const response = await this.authInstance.get(`${this.path}/courses/${courseId}`);
    return response.data;
  };

  likePlace = async (placeId: number) => {
    const response = await this.authInstance.get(`${this.path}/places/${placeId}`);
    return response.data;
  };
}

export default new LikesApi();
