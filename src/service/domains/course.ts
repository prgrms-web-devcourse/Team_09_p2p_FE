import Api from '~/service/core/Api';

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

  getCourses = async () => {
    const response = await this.baseInstance.get(`${this.path}`);
    return response;
  };
  
  create = async (formData: FormData) => {
    try {
      const response = await this.authInstance.post(`${this.path}/`, formData);
      console.log(response);
      return response.data;
    } catch (e) {
      console.error(`코스 등록 오류: ${e}`);
    }
  };

  read = async (courseId: string) => {
    /* try {
      const response = await this.baseInstance.get(`${this.path}/${courseId}`);
      console.log(response);
      return response.data;
    } catch (e) {
      console.error(`코스 상세 조회 오류: ${e}`);
    } */
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

  delete = async (courseId: string) => {
    /* try {
      const response = await this.authInstance.delete(`${this.path}/${courseId}`);
      console.log(response);
      return response.data;
    } catch (e) {
      console.error(`코스 삭제 에러: ${e}`);
    } */
  };

  search = async (paramData: CourseReadingType) => {
    /* try {
      const response = await this.baseInstance.get(this.path, {
        params: {
          placeId: paramData.placeId,
          keyword: paramData.keyword,
          region: paramData.region,
          spot: paramData.spot,
          theme: paramData.theme,
          page: paramData.page,
          size: paramData.size,
          sort: paramData.sort
        }
      });
      console.log(response);
      return response.data;
    } catch (e) {
      console.error(`코스 목록 조회 오류: ${e}`);
    } */
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
}

export default new CourseApi();
