export interface User {
  id?: string;
  first_name?: string;
  last_name?: string;
  locked?: boolean;
  role_id?: any;
  avatar_pic?: string;
  account_type?: string;
  biography?:string;
  facebook_link?:string;
  headline?:string;
  twitter_link?:string;
  website_link?:string;
  youtube_link?:string;
  amount_of_money?:string
}

export interface MailUser extends User {
  email: string;
  enabled: boolean;
}

export interface FacebookUser extends User {
  facebook_id:string
}
