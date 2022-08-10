import { object, string, mixed, ObjectSchema } from 'yup';
import { MixedSchema } from 'yup/lib/mixed';
import { Assign, ObjectShape } from 'yup/lib/object';
import { RequiredStringSchema } from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';

const MESSAGE = {
  nickname: '닉네임은 특수문자가 포함되지 않는 2~8자리로 설정해주세요.',
  birth: '올바른 생년월일을 입력해주세요.'
};

const VALIDATION = {
  nickname: /^[가-힣|a-z|A-Z|\d]{2,8}$/,
  birth: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g
};

interface SchemaInterface {
  nickname: RequiredStringSchema<string | undefined, AnyObject>;
  birth: RequiredStringSchema<string | undefined, AnyObject>;
  sex: MixedSchema<any, AnyObject, any>;
}

export const ValidationRules: ObjectSchema<Assign<ObjectShape, SchemaInterface>> = object().shape({
  nickname: string()
    .min(2, MESSAGE.nickname)
    .max(8, MESSAGE.nickname)
    .required('닉네임을 입력해주세요.'),
  birth: string().matches(VALIDATION.birth, MESSAGE.birth).required('생년월일을 입력해주세요.'),
  sex: mixed().oneOf(['male', 'female']).required('성별을 선택해주세요.')
});
