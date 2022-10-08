import 'twin.macro';
import { css as cssImport } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';
import styledImport from '@emotion/styled';

// html 태그의 props 스타일로 사용할 속성의 타입
declare module 'react' {
  interface DOMAttributes<T> {
    tw?: string;
    css?: CSSInterpolation;
  }
}

// twin 모듈의 styled, css import 시 사용할 타입
declare module 'twin.macro' {
  const styled: typeof styledImport;
  const css: typeof cssImport;
}
