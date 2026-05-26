import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 820px;
  margin: 0 auto 90px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }

  .overline {
    display: block;
    margin-bottom: 18px;
    color: var(--amber);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(42px, 7vw, 72px);
  }

  p {
    max-width: 680px;
    margin: 18px auto 0;
    color: var(--light-slate);
    font-size: clamp(var(--fz-lg), 2vw, var(--fz-xl));
    line-height: 1.45;
  }

  .contact-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
    margin-top: 38px;
  }

  .contact-link {
    ${({ theme }) => theme.mixins.bigButton};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 52px;

    &.primary {
      color: var(--dark-navy);
      background: var(--green);
      border-color: var(--green);
      font-weight: 700;

      &:hover,
      &:focus-visible {
        color: var(--dark-navy);
      }
    }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What is next?</h2>

      <h2 className="title">Let's build something useful.</h2>

      <p>
        I am open to full-stack, frontend, backend, and product engineering roles where the work
        needs a mix of craft, security awareness, performance thinking, and calm ownership.
      </p>

      <div className="contact-actions">
        <a className="contact-link primary" href={`mailto:${email}`}>
          Email Me
        </a>
        <a
          className="contact-link"
          href="https://www.linkedin.com/in/meet-adalaja/"
          target="_blank"
          rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
