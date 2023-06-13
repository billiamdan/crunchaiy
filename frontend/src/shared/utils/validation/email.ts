import { ValidatorFn } from "./models/ValidationFn";

export const validateEmail: ValidatorFn = (email: string): boolean => {
    //RFC 2822
   const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
   return re.test(email.trim())
}