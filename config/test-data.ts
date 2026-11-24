export interface Credentials {
  readonly email: string;
  readonly password: string;
}

export interface NewUserData {
  readonly gender: 'Male' | 'Female';
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
}

export interface CartProductData {
  readonly name: string;
  readonly initialQuantity: number;
  readonly updatedQuantity: number;
}

export const validUser: Credentials = {
  email: 'impulsate1010@gmail.com',
  password: '123456',
};

export function createNewUser(now: number = Date.now()): NewUserData {
  const uniqueSuffix = now.toString(36);

  return {
    gender: 'Female',
    firstName: 'Sil',
    lastName: 'Gutierrez',
    email: `sil.gutierrez.${uniqueSuffix}@example.com`,
    password: '123456',
    confirmPassword: '123456',
  };
}

export const cartProduct: CartProductData = {
  name: 'Computing and Internet',
  initialQuantity: 1,
  updatedQuantity: 2,
};
