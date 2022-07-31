import { SchemaOf, object, string, mixed } from 'yup';
import { SignupValues } from '~/types';

const MESSAGE = {
  password: '비밀번호는 영문과 숫자를 포함한 8~15자로 설정해주세요.',
  nickname: '닉네임은 3~6자리로 설정해주세요.',
  birth: '올바른 생년월일을 입력해주세요.'
};

const VALIDATION = {
  password: /(?=.*\d)(?=.*[a-zA-Z]).{8,15}/,
  birth: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g
};

export const SignupValidationSchema: SchemaOf<SignupValues> = object().shape({
  email: string().email('이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
  password: string()
    .min(8, MESSAGE.password)
    .max(15, MESSAGE.password)
    .matches(VALIDATION.password, MESSAGE.password)
    .required('비밀번호를 입력해주세요.'),
  passwordCheck: string().required('비밀번호를 한번 더 입력해주세요.'),
  nickname: string()
    .min(3, MESSAGE.nickname)
    .max(6, MESSAGE.nickname)
    .required('닉네임을 입력해주세요.'),
  birth: string().matches(VALIDATION.birth, MESSAGE.birth).required('생년월일을 입력해주세요.'),
  sex: mixed().oneOf(['male', 'female']).required('성별을 선택해주세요.')
});
