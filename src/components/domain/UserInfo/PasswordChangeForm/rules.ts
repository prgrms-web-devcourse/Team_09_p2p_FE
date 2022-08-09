import { object, string, ref, ObjectSchema } from 'yup';
import { Assign, ObjectShape } from 'yup/lib/object';
import StringSchema, { RequiredStringSchema } from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';

const MESSAGE = {
  password: '비밀번호는 영문, 숫자, 특수문자를 포함한 8~15자로 설정해주세요.',
  passwordCheck: '동일한 비밀번호가 아니에요.'
};

const VALIDATION = {
  password: /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()]).{8,15}/
};

interface SchemaInterface {
  password: RequiredStringSchema<string | undefined, AnyObject>;
  passwordCheck: StringSchema<string | undefined, AnyObject, string | undefined>;
}

export const ValidationRules: ObjectSchema<Assign<ObjectShape, SchemaInterface>> = object().shape({
  oldPassword: string().required('현재 비밀번호를 입력해주세요.'),
  password: string()
    .min(8, MESSAGE.password)
    .max(15, MESSAGE.password)
    .matches(VALIDATION.password, MESSAGE.password)
    .required('비밀번호를 입력해주세요.'),
  passwordCheck: string()
    .required('비밀번호를 한번 더 입력해주세요.')
    .when('password', {
      is: (password: string) => (password && password.length > 0 ? true : false),
      then: string().oneOf([ref('password')], MESSAGE.passwordCheck)
    })
});
