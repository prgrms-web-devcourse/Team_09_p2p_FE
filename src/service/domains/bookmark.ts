import Api from '~/service/core/Api';

class BookmarkApi extends Api {
  private path = '/bookmarks';

  BookmarkCourse = async (courseId: number) => {
    const response = await this.authInstance.get(`${this.path}/courses/${courseId}`);
    return response.data;
  };

  BookmarkPlace = async (placeId: number) => {
    const response = await this.authInstance.get(`${this.path}/places/${placeId}`);
    return response.data;
  };
}

export default new BookmarkApi();
