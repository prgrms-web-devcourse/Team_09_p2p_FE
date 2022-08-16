import Api from '~/service/core/Api';
import { CourseFilter, CourseSearchParams } from '~/types/course';
import { makeQueryString, ObjectToQuery } from '~/utils/converter';

type CourseReadingType = {
  readonly placeId?: number;
  readonly keyword?: string;
  readonly region?: string;
  readonly spot?: string[];
  readonly theme?: string[];
  readonly page: number;
  readonly size: number;
  readonly sort: string;
};

type CourseSearchBookmarked = {
  readonly page: number;
  readonly size: number;
  readonly sort?: string;
  readonly userId: number;
};

class CourseApi extends Api {
  private path = '/courses';

  getCourses = async (filter?: CourseSearchParams) => {
    const response = await this.authInstance.get(`${this.path}`, { params: filter });
    return response.data;
  };

  create = async (formData: FormData) => {
    try {
      const response = await this.authInstance.post(`${this.path}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.status;
    } catch (e) {
      alert(`코스 등록에 실패했습니다`);
    }
  };

  read = async (courseId: number) => {
    try {
      const response = await this.baseInstance.get(`${this.path}/${courseId}`);
      return response.data;
    } catch (e) {
      alert(`코스 상세 조회에 실패했습니다`);
    }
  };

  authRead = async (courseId: number) => {
    try {
      const response = await this.authInstance.get(`${this.path}/${courseId}`);
      return response.data;
    } catch (e) {
      alert(`코스 상세 조회에 실패했습니다`);
    }
  };

  update = async (courseId: number, formData: FormData) => {
    try {
      const response = await this.authInstance.put(`${this.path}/${courseId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.status;
    } catch (e) {
      alert(`코스 상세 수정에 실패했습니다`);
    }
  };

  delete = async (courseId: number) => {
    try {
      const response = await this.authInstance.delete(`${this.path}/${courseId}`);
      return response.data;
    } catch (e) {
      alert(`코스 삭제에 실패했습니다`);
    }
  };

  search = async (params: CourseSearchParams) => {
    const queries = makeQueryString(params);
    try {
      const response = await this.authInstance.get(`${this.path}${queries}`);
      if (response.status === 200 || response.status === 204) {
        return response.data;
      }
      throw new Error(`코스 목록 조회 오류, 상태코드 : ${response.status}`);
    } catch (e) {
      alert(`코스 목록 조회에 실패했습니다`);
    }
  };

  getComments = async (courseId: number) => {
    const response = await this.baseInstance.get(`${this.path}/${courseId}/comments`);
    return response.data;
  };

  createComment = async (courseId: number, data: object) => {
    const response = await this.authInstance.post(`${this.path}/${courseId}/comments`, data);
    return response.data;
  };

  updateComment = async (courseId: number, commentId: number, data: object) => {
    const response = await this.authInstance.put(
      `${this.path}/${courseId}/comments/${commentId}`,
      data
    );
    return response.data;
  };

  deleteComment = async (courseId: number, commentId: number) => {
    const response = await this.authInstance.delete(
      `${this.path}/${courseId}/comments/${commentId}`
    );
    return response.data;
  };

  getBookmarked = async (userId: number) => {
    const response = await this.authInstance.get(`${this.path}/bookmark`, {
      params: { userId: userId }
    });
    return response.data;
  };

  getUserCourses = async (userId: number) => {
    const response = await this.authInstance.get(`${this.path}/users/${userId}`);
    return response.data;
  };
}

export default new CourseApi();
