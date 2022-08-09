import Api from '~/service/core/Api';

class PlaceApi extends Api {
  private path = '/places';

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
}

export default new PlaceApi();
