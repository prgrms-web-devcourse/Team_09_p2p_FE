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

  getCourses = async (filter?: CourseFilter) => {
    let queryString = ''; // 일단 전체 조회 할 수 있도록 처리
    if (filter !== undefined) {
      queryString = ObjectToQuery(filter);
    }

    const response = await this.authInstance.get(`${this.path}/${queryString}`);
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
      console.error(`코스 등록 오류: ${e}`);
    }
  };

  read = async (courseId: number) => {
    try {
      const response = await this.baseInstance.get(`${this.path}/${courseId}`);
      return response.data;
    } catch (e) {
      console.error(`코스 상세 조회 오류: ${e}`);
    }
  };

  authRead = async (courseId: number) => {
    try {
      const response = await this.authInstance.get(`${this.path}/${courseId}`);
      return response.data;
    } catch (e) {
      console.error(`코스 상세 조회 오류: ${e}`);
    }
  };

  update = async (formData: FormData) => {
    /* try {
      const response = await this.authInstance.put(this.path, formData);
      console.log(response);
      return response.data;
    } catch (e) {
      console.error(`코스 수정 에러: ${e}`);
    } */
  };

  delete = async (courseId: number) => {
    try {
      const response = await this.authInstance.delete(`${this.path}/${courseId}`);
      return response.data;
    } catch (e) {
      console.error(`코스 삭제 에러: ${e}`);
    }
  };

  search = async (params: CourseSearchParams) => {
    const queries = makeQueryString(params);
    try {
      const response = await this.baseInstance.get(`${this.path}${queries}`);
      if (response.status === 200 || response.status === 204) {
        return response.data;
      }
      throw new Error(`코스 목록 조회 오류, 상태코드 : ${response.status}`);
    } catch (e) {
      console.error(`코스 목록 조회 오류: ${e}`);
    }
  };

  searchBookmarked = async (paramData: CourseSearchBookmarked) => {
    /* try {
      const response = await this.baseInstance.get(this.path, {
        params: {
          page: paramData.page,
          size: paramData.size,
          sort: paramData.sort,
          userId: paramData.userId
        }
      });
      console.log(response);
      return response.data;
    } catch (e) {
      console.error(`코스 목록 조회 오류: ${e}`);
    } */
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
