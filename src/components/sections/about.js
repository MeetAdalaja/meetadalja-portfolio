import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;
    text-align: justify;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;
    text-align: initial;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    a.inline-link::after {
      transition: none;
    }
  }

  a.inline-link {
    position: relative;
    display: inline-block;
    color: inherit;
    text-decoration: none;
  }

  a.inline-link::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 2px; /* adjust as you like */
    width: 100%;
    height: 2px;

    background: currentColor; /* IMPORTANT: makes the line visible */
    transform: scaleX(0); /* start hidden */
    transform-origin: left; /* grow from left -> right */
    transition: transform 0.25s ease;
  }

  a.inline-link:hover::after,
  a.inline-link:focus-visible::after {
    transform: scaleX(1); /* expands to full width */
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'TypeScript',
    'React.js/Angular/Next.js',
    'Redux Toolkit & RTK Query',
    'Node.js (Express.js/NestJS)',
    'MongoDB & Firebase',
    'Tailwind CSS & Material UI',
    'REST/GraphQL APIs',
    'JWT Auth & RBAC',
    'PostgreSQL/MySQL (SQL)',
    'MongoDB & Redis',
    'TypeORM & Migrations',
    'Jest & Supertest',
    'Docker & CI/CD (Jenkins, GitHub Actions)',
    'AWS/Azure',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Meet Adalaja, and I’m passionate about building web experiences that
              are functional, thoughtful, and user-centric. I enjoy taking ideas from concept to
              production by building clean UI, predictable APIs, and reliable releases that scale.
            </p>

            <p>
              Professionally, I’ve worked with fast-paced teams like <b>Purezza Technologies</b> and{' '}
              <b>TechAnek</b>, building responsive <b>React/Angular/Next.js</b> apps and integrating{' '}
              <b>Node.js</b> <b>REST/GraphQL APIs</b> across <b>MongoDB</b> and{' '}
              <b>PostgreSQL/MySQL</b>. Along the way, I owned PR quality, testing with{' '}
              <b>Jest/Supertest</b>, and CI/CD practices, plus mentoring and Agile delivery to ship
              changes with confidence.
            </p>

            <p>
              I completed my M.Sc. in Computer Science at Algoma University and built projects like
              a{' '}
              <b>
                <a
                  className="inline-link"
                  href="https://multi-tenant-rbac-task-management-b.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer">
                  Multi-Tenant RBAC Task Board
                </a>
              </b>{' '}
              (Angular + NestJS) with secured APIs and seeded org/user data, plus <b>MailGenieAI</b>
              , a Gmail add-on that speeds up drafting with AI. My current focus is building
              accessible, responsive full-stack apps with <b>React/Angular</b>, <b>TypeScript</b>,
              and <b>Node.js</b>.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
