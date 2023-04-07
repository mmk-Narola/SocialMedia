export interface signUp {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface login {
  email?: string;
  password?: string;
}

export interface password {
  password?: string;
  comfirmPassword?: string;
}

export interface ProfileUser {
  _id?: string;
  email?: string;
  password?: string;
  name?: string;
  image?: string;
  isOnline?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastMessage?: string;
}
export interface allUser {
  message?: string;
  results?: number;
  data?: ProfileUser;
}
export interface singleUser {
  message?: string;
  data?: ProfileUser;
}

export interface post {}

export class GlobalConstants {
  //Message
  public static genericError: string =
    'Something went wrong. Please try again later';

  //Regex
  public static nameRegex: string = '[a-zA-Z0-9]*';
  public static userNameRegex: string = '/^[a-z0-9]*';
  public static emailRegex: string = '/^[a-z0-9.]+@[a-z]+.[a-z]+$/';
  public static contactNumberRegex: string = '^[e0-9]{10,10}$';
  public static password: string =
    '^(?=.*?[A-Z])(?=.*[!@#$%^&*])(?=.*?[a-z])(?=.*?[0-9]).{5,}$';
}

// '^(?=.*?[A-Z])(?=.*[!@#$%^&*])(?=.*?[a-z])(?=.*?[0-9]).{5,}$';
//  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{5,}$';
