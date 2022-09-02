import theme from '~/styles/theme';

export type ButtonTypes = 'primary' | 'borderPrimary' | 'tag' | 'darkGray' | 'borderNone' | 'gray';
export type ButtonSizes = 'sm' | 'md' | 'lg';

export type ButtonStyleType = {
  [key in ButtonTypes]: string;
};

export type ButtonSizeType = {
  [key in ButtonSizes]: string;
};

const { mainColor, fontDarkGray, borderDarkGray } = theme.color;
const { basicShadow } = theme.shadow;

export const buttonStyle: ButtonStyleType = {
  primary: `
    color: #fff;
    background-color:${mainColor};

    &:hover{
      background-color:#438ce1;
    }
  `,
  borderPrimary: `
    color: ${mainColor};
    background-color: #fff;
    border: 1px solid ${mainColor};

    &:hover {
      background-color: #f6f9ff;
    }
  `,
  tag: `
    color: ${fontDarkGray};
    border: 1px solid ${borderDarkGray};
    box-shadow: ${basicShadow};

    &:hover {
      background-color: #f4f8fb;
      background-color: #f7f8f9;
 
    }
  `,
  darkGray: `
    color: #fff;
    background-color: #909090;

  `,
  gray: `
    color: #262626;
    background-color: #f1f1f1;

    &:hover {
      background-color:#e3e3e3;
    }
  `,
  borderNone: `
    color: ${mainColor};
    background-color: #fff;

    &:hover {
      background-color: #f6f9ff;
    }

  `
};

export const buttonSize: ButtonSizeType = {
  sm: `
    padding: 10px 20px;
    font-size: 18px;
  `,
  md: `
    padding: 16px 22px;
    font-size: 20px;
  `,
  lg: `
    padding: 20px 45px;
    font-size: 22px;
  `
};
