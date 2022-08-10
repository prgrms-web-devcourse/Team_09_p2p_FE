interface IUser {
  id: number;
  nickname: string;
  profileImage: string;
}

export interface IComment {
  id: number;
  comment: string;
  rootCommentId: number;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}

export interface IComments {
  id: number;
  totalCount: number;
  courseComments: IComment[] | [];
}
