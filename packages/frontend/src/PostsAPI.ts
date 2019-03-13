export interface Category {
  name: string;
  path: string;
}
interface EditPost {
  title: string;
  body: string;
}
interface CreatePost extends EditPost {
  id: string;
  timestamp: number;
  author: string;
  category: string;
}
export interface Post extends CreatePost {
  voteScore: number;
  deleted: boolean;
  commentCount: number;
}
interface EditComment {
  timestamp: number;
  body: string;
}
interface CreateComment extends EditComment {
  id: string;
  author: string;
  parentId: string;
}
export interface PostComment extends CreateComment {
  voteScore: number;
  deleted: boolean;
  parentDeleted: boolean;
}
interface InitialData {
  categories: Category[];
  posts: Post[];
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

  public getCategories = (): Promise<Category[]> =>
    this.getData(`${this.api}/categories`).then(data => data.categories);

  public getCategoryPosts = (category: string): Promise<Post[]> =>
    this.getData(`${this.api}/${category}/posts`);

  public getPosts = (): Promise<Post[]> => this.getData(`${this.api}/posts`);

  public createPost = (post: CreatePost): Promise<Post> =>
    this.saveData("POST", `${this.api}/posts`, { post });

  public getPost = (postId: string): Promise<Post> =>
    this.getData(`${this.api}/posts/${postId}`);

  public votePost = (postId: string, option: Vote): Promise<any> =>
    this.saveData("POST", `${this.api}/posts/${postId}`, { option });

  public updatePost = (postId: string, post: EditPost): Promise<Post> =>
    this.saveData("PUT", `${this.api}/posts/${postId}`, { post });

  public deletePost = (postId: string): Promise<any> =>
    this.deleteData(`${this.api}/posts/${postId}`);

  public getPostComments = (postId: string): Promise<PostComment[]> =>
    this.getData(`${this.api}/posts/${postId}/comments`);

  public createComment = (comment: CreateComment): Promise<PostComment> =>
    this.saveData("POST", `${this.api}/comments`, { comment });

  public getComment = (commentId: string): Promise<PostComment> =>
    this.getData(`${this.api}/comments/${commentId}`);

  public voteComment = (
    commentId: string,
    option: Vote
  ): Promise<PostComment> =>
    this.saveData("POST", `${this.api}/comments/${commentId}`, { option });

  public updateComment = (
    commentId: string,
    data: EditComment
  ): Promise<PostComment> =>
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
      body: JSON.stringify({ data }),
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
