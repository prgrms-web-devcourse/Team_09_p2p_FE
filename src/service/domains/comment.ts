import Api from '~/service/core/Api';
import { CourseOrPlace } from '~/types';
import CourseApi from './course';
import PlaceApi from './place';

class CommentApi extends Api {
  getComments = async (id: number, type: CourseOrPlace) => {
    switch (type) {
      case 'course':
        return await CourseApi.getComments(id).then((res) => res.courseComments);
      case 'place':
        return await PlaceApi.getComments(id).then((res) => res.placeComments);
      default:
        return;
    }
  };

  // data 타입지정 다시 할 예정
  createComment = async (id: number, data: object, type: CourseOrPlace) => {
    switch (type) {
      case 'course':
        return await CourseApi.createComment(id, data);
      case 'place':
        return await PlaceApi.createComment(id, data);
      default:
        return;
    }
  };

  updateComment = async (id: number, commentId: number, data: object, type: CourseOrPlace) => {
    switch (type) {
      case 'course':
        return await CourseApi.updateComment(id, commentId, data);
      case 'place':
        return await PlaceApi.updateComment(id, commentId, data);
      default:
        return;
    }
  };

  deleteComment = async (id: number, commentId: number, type: CourseOrPlace) => {
    switch (type) {
      case 'course':
        return await CourseApi.deleteComment(id, commentId);
      case 'place':
        return await PlaceApi.deleteComment(id, commentId);
      default:
        return;
    }
  };
}

export default new CommentApi();
