import { object, string, mixed, ref, ObjectSchema } from 'yup';
import { MixedSchema } from 'yup/lib/mixed';
import { Assign, ObjectShape } from 'yup/lib/object';
import StringSchema, { RequiredStringSchema } from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';

const MESSAGE = {
  password: '비밀번호는 영문과 숫자를 포함한 8~15자로 설정해주세요.',
  passwordCheck: '동일한 비밀번호가 아니에요.',
  nickname: '닉네임은 2~8자리로 설정해주세요.',
  birth: '올바른 생년월일을 입력해주세요.'
};

const VALIDATION = {
  password: /(?=.*\d)(?=.*[a-zA-Z]).{8,15}/,
  birth: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g
};

interface SchemaInterface {
  email: RequiredStringSchema<string | undefined, AnyObject>;
  password: RequiredStringSchema<string | undefined, AnyObject>;
  passwordCheck: StringSchema<string | undefined, AnyObject, string | undefined>;
  nickname: RequiredStringSchema<string | undefined, AnyObject>;
  birth: RequiredStringSchema<string | undefined, AnyObject>;
  sex: MixedSchema<any, AnyObject, any>;
}

export const SignupValidationRules: ObjectSchema<Assign<ObjectShape, SchemaInterface>> =
  object().shape({
    email: string().email('이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
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
      }),
    nickname: string()
      .min(2, MESSAGE.nickname)
      .max(8, MESSAGE.nickname)
      .required('닉네임을 입력해주세요.'),
    birth: string().matches(VALIDATION.birth, MESSAGE.birth).required('생년월일을 입력해주세요.'),
    sex: mixed().oneOf(['male', 'female']).required('성별을 선택해주세요.')
  });
