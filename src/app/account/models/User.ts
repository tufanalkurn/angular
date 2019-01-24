
export class User {
  id: number;
  email: string;
  role: Role;
  userProfile?: Profile;
}

export class Profile {
  about_us: string;
  full_name: string;
  avatar: Avatar;
  cover: Cover;
  gender: string;
  mobile: string;
  telephone: string;
  dob: string;
  user_id: number;
  cover_id:number;
  avatar_id:number;
  plan_id:number;
}

export class Avatar {
  id: number;
  media:Media; 
}

export class Cover {
  id: number;
  media:Media;
}

export class Media {
  id:number;
  filename:string;
  filesize:number;
  path:string;
  mimetype:string;
  status:number;
}

export enum Role {
  User = 'User',
  Coache = 'Coache',
  Promo = 'Promo'
}