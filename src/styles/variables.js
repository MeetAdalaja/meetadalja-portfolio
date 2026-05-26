import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #07110f;
    --navy: #0b1211f7;
    --light-navy: #13201d;
    --lightest-navy: #25443b;
    --navy-shadow: rgba(0, 0, 0, 0.46);
    --dark-slate: #5c6a65;
    --slate: #91a09b;
    --light-slate: #bfcbc6;
    --lightest-slate: #f4f7f3;
    --white: #fffaf0;
    --green: #35f0bd;
    --green-tint: rgba(53, 240, 189, 0.1);
    --pink: #ff7aa2;
    --blue: #67b7ff;
    --amber: #f6bd60;
    --coral: #ff8066;
    --cream: #fff3d7;

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 8px;
    --nav-height: 80px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
