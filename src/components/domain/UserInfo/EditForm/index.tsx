import styled from '@emotion/styled';
import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { Button, Text } from '~/components/atom';
import { ValidationRules } from './rules';

export interface UserEditFormValues {
  email: string;
  nickname: string;
  sex: 'male' | 'female';
  birth: string;
}

interface UserEditForm {
  initialValues: UserEditFormValues;
  onSubmit: (data: UserEditFormValues) => void;
}

const UserEditForm = ({ initialValues, onSubmit: onSubmitAction }: UserEditForm) => {
  const [isCheckedDuplicateEmail, setIsCheckedDuplicateEmail] = useState(false);
  const [isCheckedDuplicateNickname, setIsCheckedDuplicateNickname] = useState(false);
  const initDuplicatedEmail = useCallback(() => setIsCheckedDuplicateEmail(false), []);
  const initDuplicatedNickname = useCallback(() => setIsCheckedDuplicateNickname(false), []);
  const checkDuplicatedEmail = () => setIsCheckedDuplicateEmail(true);
  const checkDuplicatedNickname = () => setIsCheckedDuplicateNickname(true);

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: ValidationRules,
    onSubmit: (data: UserEditFormValues) => {
      if (!isCheckedDuplicateEmail) {
        //TODO - ConfirmModal 사용하기
        window.alert('이메일 중복확인을 해주세요.');
        return;
      }
      if (!isCheckedDuplicateNickname) {
        //TODO - ConfirmModal 사용하기
        window.alert('닉네임 중복확인을 해주세요.');
        return;
      }

      onSubmitAction && onSubmitAction(data);
    }
  });

  return (
    <Form>
      <FormItem>
        <FormTitle>
          <Text>이메일</Text>
        </FormTitle>
        <FormGroup>{initialValues.email}</FormGroup>
      </FormItem>
      <FormItem>
        <FormTitle>
          <Text>닉네임</Text>
        </FormTitle>
        <FormGroup>
          <input type="text" name="nickname" />
        </FormGroup>
      </FormItem>
      <FormItem>
        <FormTitle>
          <Text>성별</Text>
        </FormTitle>
        <FormGroup>
          <input type="text" name="sex" />
        </FormGroup>
      </FormItem>
      <FormItem>
        <FormTitle>
          <Text>생년월일</Text>
        </FormTitle>
        <FormGroup>
          <input type="data" name="birth" />
        </FormGroup>
      </FormItem>
      <Button type="submit" size="md" width={195} style={{ marginLeft: 150 }}>
        내 정보 수정
      </Button>
    </Form>
  );
};

export default UserEditForm;

const Form = styled.div`
  margin-top: 76px;
`;

const FormItem = styled.div`
  display: flex;
  height: 70px;
`;

const FormTitle = styled.div`
  width: 150px;
  font-weight: 500;
`;

const FormGroup = styled.div``;
