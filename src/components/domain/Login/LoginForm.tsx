import Link from 'next/link';
import React from 'react';
import { useFormik } from 'formik';
import { SchemaOf, object, string } from 'yup';
import { LoginValues } from '~/types';

const LoginValidationSchema: SchemaOf<LoginValues> = object().shape({
  email: string().email('이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
  password: string().required('비밀번호를 입력해주세요.')
});

const initialValues: LoginValues = {
  email: '',
  password: ''
};

interface LoginFormProps {
  onSubmit: (data: LoginValues) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit: trigger }) => {
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    onSubmit: (data: LoginValues) => {
      trigger && trigger(data);
    },
    validationSchema: LoginValidationSchema
  });

  return (
    <div>
      <h1>로고</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" style={{ display: 'none' }}>
          이메일
        </label>
        {touched.email && errors.email && <div>{errors.email}</div>}
        <input
          id="email"
          name="email"
          type="email"
          placeholder="이메일"
          required
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="password" style={{ display: 'none' }}>
          비밀번호
        </label>
        {touched.password && errors.password && <div>{errors.password}</div>}
        <input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={values.password}
          onChange={handleChange}
        />
        <button
          disabled={Boolean(!values.email || !values.password || errors.email || errors.password)}
          type="submit"
        >
          로그인
        </button>
      </form>
      <div>
        <span>
          아직 회원이 아니신가요? <Link href="/signup">회원가입</Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
