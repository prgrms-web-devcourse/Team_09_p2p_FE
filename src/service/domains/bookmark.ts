import Api from '~/service/core/Api';
import { CourseOrPlace } from '~/types';

class BookmarkApi extends Api {
  private path = '/bookmarks';

  bookmarkCourse = async (courseId: number) => {
    const response = await this.authInstance.get(`${this.path}/courses/${courseId}`);
    return response.data;
  };

  bookmarkPlace = async (placeId: number) => {
    const response = await this.authInstance.get(`${this.path}/places/${placeId}`);
    return response.data;
  };

  bookmark = async (id: number, type: CourseOrPlace) => {
    switch (type) {
      case 'course':
        return await this.bookmarkCourse(id);
      case 'place':
        return await this.bookmarkPlace(id);
      default:
        return;
    }
  };
}

export default new BookmarkApi();
