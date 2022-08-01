interface IUser {
  id: number;
  nickname: string;
  profileImage: string;
}

export interface IRecomment {
  id: number;
  comment: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  id: number;
  comment: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  recomments: IRecomment[];
}
