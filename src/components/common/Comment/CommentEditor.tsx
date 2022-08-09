import styled from '@emotion/styled';
import { useState } from 'react';
import { Button } from '~/components/atom';
import theme from '~/styles/theme';

interface CommitEditorProps {
  onSubmit: (value: string) => void;
  onCancel: () => void;
  defaultValue: string;
}

const CommentEditor = ({ onSubmit, onCancel, defaultValue }: CommitEditorProps) => {
  const [textValue, setTextValue] = useState(defaultValue);

  const handleSubmit = () => {
    onSubmit(textValue);
    setTextValue(defaultValue);
  };

  const handleCancel = () => {
    onCancel();
    setTextValue(defaultValue);
  };
  return (
    <EditWrapper>
      <CommentTextarea
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      ></CommentTextarea>
      <EditButtons>
        <Button buttonType="borderPrimary" onClick={handleCancel}>
          취소
        </Button>
        <Button onClick={handleSubmit}>등록</Button>
      </EditButtons>
    </EditWrapper>
  );
};

export default CommentEditor;

const { borderDarkGray, fontDarkBlack, fontGray } = theme.color;

const EditWrapper = styled.div`
  width: 100%;
  padding-left: 18px;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  border: 1px solid ${borderDarkGray};
  color: ${fontDarkBlack};
  border-radius: 8px;
  outline: 0;
  flex-grow: 1;
  padding: 24px;
  font-size: 20px;
  margin-right: 20px;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;

  &::placeholder {
    color: ${fontGray};
  }
`;

const EditButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
  gap: 8px;
`;
