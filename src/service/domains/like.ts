import Api from '~/service/core/Api';
import { LikeType } from '~/types/like';

class LikeApi extends Api {
  private path = '/likes';

  likeCourse = async (courseId: number) => {
    const response = await this.authInstance.get(`${this.path}/courses/${courseId}`);
    return response.data;
  };

  likePlace = async (placeId: number) => {
    const response = await this.authInstance.get(`${this.path}/places/${placeId}`);
    return response.data;
  };

  like = async (id: number, type: LikeType) => {
    switch (type) {
      case 'course':
        return await this.likeCourse(id);
      case 'place':
        return await this.likePlace(id);
      default:
        return;
    }
  };
}

export default new LikeApi();
