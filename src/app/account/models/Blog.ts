export class Blog {
  code: string;
  msg: string;
  post: Post;
}

export class Post {
  id: number;
  restricted: number;
  status: number;
  slug: string;
  external_url: string;
  title: string;
  content: string;
  short_content: string;
  location: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  image: string;
  media: string;
  category: Category;
  images: Images;
  videos: Videos;
  prev: Prev;
  next: Next;
}

export class Images {
  media_id: number;
  cms_id: number;
  file_id: number;
  type: string;
  is_primary: number;
}

export class Videos {
  cms_id:number;
  title:string;
  description:string;
  link:string;
  video_id:number;
  tparty_id:number;
  status:number;
  created_at: string;
  updated_at: string;
}

export class Category {
  category_id: number;
  parent_id: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  description: string;
  image: Image;
  media: Media;
  prev: Prev;
  next: Next;
}

export class Image {
  id: number;
  guid: string;
  filename: string;
  filesize: number;
  path: string;
  mimetype: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export class Media {
  id: number;
  guid: string;
  filename: string;
  filesize: number;
  path: string;
  mimetype: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export class Prev {
  id: number;
  slug: string;
}

export class Next {
  id: number;
  slug: string;
}