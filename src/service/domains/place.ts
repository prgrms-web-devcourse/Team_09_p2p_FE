import Api from '~/service/core/Api';
import { PlaceFilter, PlaceSearchParams } from '~/types/place';
import { makeQueryString, ObjectToQuery } from '~/utils/converter';

class PlaceApi extends Api {
  private path = '/places';

  read = async (placeId: number) => {
    try {
      const response = await this.authInstance.get(`${this.path}/${placeId}`);
      return response.data;
    } catch (e) {
      console.error(`장소 상세 조회 오류: ${e}`);
    }
  };

  getComments = async (placeId: number) => {
    const response = await this.baseInstance.get(`${this.path}/${placeId}/comments`);
    return response.data;
  };

  createComment = async (placeId: number, data: object) => {
    const response = await this.authInstance.post(`${this.path}/${placeId}/comments`, data);
    return response.data;
  };

  updateComment = async (placeId: number, commentId: number, data: object) => {
    const response = await this.authInstance.put(
      `${this.path}/${placeId}/comments/${commentId}`,
      data
    );
    return response.data;
  };

  deleteComment = async (placeId: number, commentId: number) => {
    const response = await this.authInstance.delete(
      `${this.path}/${placeId}/comments/${commentId}`
    );
    return response.data;
  };

  getPlaces = async (filter?: PlaceFilter) => {
    let queryString = '';
    if (filter !== undefined) {
      queryString = ObjectToQuery(filter);
    }

    const response = await this.authInstance.get(`${this.path}/${queryString}`);
    console.log(response.data, 'response Data');
    return response.data;
  };

  search = async (params: PlaceSearchParams) => {
    const queries = makeQueryString(params);
    console.log(queries);
    try {
      const response = await this.authInstance.get(`${this.path}${queries}`);
      if (response.status === 200 || response.status === 204) {
        return response.data;
      }
      throw new Error(`코스 목록 조회 오류, 상태코드 : ${response.status}`);
    } catch (e) {
      console.error(`코스 목록 조회 오류: ${e}`);
    }
  };

  getBookmarked = async (userId: number) => {
    const response = await this.authInstance.get(`${this.path}/bookmark`, {
      params: { userId: userId }
    });
    return response.data;
  };
}

export default new PlaceApi();
