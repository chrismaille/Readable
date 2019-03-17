export interface ICategory {
  name: string;
  path: string;
}
interface IEditPost {
  title: string;
  body: string;
}
interface ICreatePost extends IEditPost {
  id: string;
  timestamp: number;
  author: string;
  category: string;
}
export interface IPost extends ICreatePost {
  voteScore: number;
  deleted: boolean;
  commentCount: number;
}
interface IEditComment {
  timestamp: number;
  body: string;
}
interface ICreateComment extends IEditComment {
  id: string;
  author: string;
  parentId: string;
}
export interface IPostComment extends ICreateComment {
  voteScore: number;
  deleted: boolean;
  parentDeleted: boolean;
}
export interface InitialData {
  categories: ICategory[];
  posts: IPost[];
}

type Vote = "upVote" | "downVote";
type saveMethod = "POST" | "PUT";

class PostsAPI {
  private readonly api: string;
  private headers: Record<string, string>;

  constructor() {
    let token: string = localStorage.token;
    if (!token) {
      token = localStorage.token = Math.random()
        .toString(36)
        .substr(-8);
    }

    this.api = "http://localhost:3001";
    this.headers = {
      Accept: "application/json",
      Authorization: token
    };
  }

  public getCategories = (): Promise<ICategory[]> =>
    this.getData(`${this.api}/categories`).then(data => data.categories);

  public getCategoryPosts = (category: string): Promise<IPost[]> =>
    this.getData(`${this.api}/${category}/posts`);

  public getPosts = (): Promise<IPost[]> => this.getData(`${this.api}/posts`);

  public createPost = (post: ICreatePost): Promise<IPost> =>
    this.saveData("POST", `${this.api}/posts`, { post });

  public getPost = (postId: string): Promise<IPost> =>
    this.getData(`${this.api}/posts/${postId}`);

  public votePost = (postId: string, option: Vote): Promise<any> =>
    this.saveData("POST", `${this.api}/posts/${postId}`, { option });

  public updatePost = (postId: string, post: IEditPost): Promise<IPost> =>
    this.saveData("PUT", `${this.api}/posts/${postId}`, { post });

  public deletePost = (postId: string): Promise<any> =>
    this.deleteData(`${this.api}/posts/${postId}`);

  public getPostComments = (postId: string): Promise<IPostComment[]> =>
    this.getData(`${this.api}/posts/${postId}/comments`);

  public createComment = (comment: ICreateComment): Promise<IPostComment> =>
    this.saveData("POST", `${this.api}/comments`, { comment });

  public getComment = (commentId: string): Promise<IPostComment> =>
    this.getData(`${this.api}/comments/${commentId}`);

  public voteComment = (
    commentId: string,
    option: Vote
  ): Promise<IPostComment> =>
    this.saveData("POST", `${this.api}/comments/${commentId}`, { option });

  public updateComment = (
    commentId: string,
    data: IEditComment
  ): Promise<IPostComment> =>
    this.saveData("PUT", `${this.api}/comments/${commentId}`, { data });

  public deleteComment = (commentId: string): Promise<any> =>
    this.deleteData(`${this.api}/comments/${commentId}`);

  public getInitialData(): Promise<InitialData> {
    return Promise.all([this.getCategories(), this.getPosts()]).then(
      ([categories, posts]) => ({
        categories,
        posts
      })
    );
  }

  private getData = (url: string): Promise<any> =>
    fetch(url, { headers: this.headers }).then(res => res.json());

  private saveData = (
    method: saveMethod,
    url: string,
    data: any
  ): Promise<any> =>
    fetch(url, {
      method,
      // tslint:disable-next-line:object-literal-sort-keys
      body: JSON.stringify(data),
      headers: {
        ...this.headers,
        "Content-Type": "application/json"
      }
    }).then(res => res.json());

  private deleteData = (url: string): Promise<any> =>
    fetch(url, {
      headers: {
        ...this.headers,
        "Content-Type": "application/json"
      },
      method: "DELETE"
    }).then(res => res.json());
}

export const api = new PostsAPI();
