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

export interface IMyComment {
  id: number;
  rootId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  rootCommentId: number;
  subCommentCount: number;
  userId: number;
  content: {
    id: number;
    title: string;
    type: string;
  };
}
