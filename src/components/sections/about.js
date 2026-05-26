import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 1100px;

  .inner {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
    gap: 56px;
    align-items: start;

    @media (max-width: 860px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledText = styled.div`
  p {
    max-width: 760px;
    color: var(--light-slate);
    line-height: 1.48;
  }

  .focus-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin: 28px 0;

    @media (max-width: 720px) {
      grid-template-columns: 1fr;
    }
  }

  .focus-card {
    padding: 18px;
    border: 1px solid rgba(244, 247, 243, 0.1);
    border-radius: var(--border-radius);
    background: rgba(19, 32, 29, 0.72);

    span {
      display: block;
      margin-bottom: 8px;
      color: var(--amber);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
    }

    p {
      margin: 0;
      font-size: var(--fz-md);
      line-height: 1.35;
    }
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(180px, 1fr));
    gap: 10px 18px;
    padding: 0;
    margin: 24px 0 0;
    overflow: hidden;
    list-style: none;

    @media (max-width: 540px) {
      grid-template-columns: 1fr;
    }

    li {
      position: relative;
      padding-left: 22px;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      line-height: 1.45;

      &:before {
        content: '>';
        position: absolute;
        left: 0;
        color: var(--green);
      }
    }
  }
`;

const StyledPic = styled.div`
  position: sticky;
  top: 120px;

  @media (max-width: 860px) {
    position: relative;
    top: 0;
    max-width: 420px;
  }

  .wrapper {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(244, 247, 243, 0.12);
    border-radius: var(--border-radius);
    background-color: var(--green);
    box-shadow: 0 28px 70px -44px var(--navy-shadow);

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1.05);
      transition: var(--transition);
    }

    &:hover,
    &:focus-within {
      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }
  }

  .profile-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 12px;

    @media (max-width: 420px) {
      grid-template-columns: 1fr;
    }

    p {
      margin: 0;
      padding: 16px;
      border: 1px solid rgba(244, 247, 243, 0.1);
      border-radius: var(--border-radius);
      background: rgba(19, 32, 29, 0.72);
      color: var(--light-slate);
      font-size: var(--fz-sm);
      line-height: 1.3;
    }

    span {
      display: block;
      margin-bottom: 6px;
      color: var(--white);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
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
    'TypeScript / JavaScript / SQL',
    'React / Next.js / Angular',
    'Redux Toolkit / RTK Query',
    'Node.js / Express / NestJS',
    'PostgreSQL / MySQL / MongoDB',
    'Redis / TypeORM / Migrations',
    'JWT / RBAC / Swagger / GraphQL',
    'Jest / Supertest / API testing',
    'Docker / CI/CD / GitHub Actions',
    'AWS / Azure DevOps / Linux',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <p>
            I am a full-stack developer who likes product work with real constraints: users waiting
            on a slow dashboard, operators needing reliable order states, teams needing cleaner
            release paths, and APIs that should be secure by default.
          </p>

          <p>
            My experience spans Purezza Technologies, TechAnek, InfoLabz, and a newer ThreatLocker
            chapter where the through-line is security-first product thinking. I have shipped
            React/Angular/Next.js interfaces, Node/NestJS APIs, JWT/RBAC authorization, OpenAPI
            contracts, SQL/MongoDB data work, tests, CI/CD, and the runbooks that make production
            less mysterious.
          </p>

          <div className="focus-grid">
            <div className="focus-card">
              <span>01 / Product UI</span>
              <p>Interfaces that feel clear under pressure, not just polished in a screenshot.</p>
            </div>
            <div className="focus-card">
              <span>02 / Platform APIs</span>
              <p>Typed contracts, validation, permissions, testing, and measurable latency wins.</p>
            </div>
            <div className="focus-card">
              <span>03 / Team Systems</span>
              <p>PR standards, mentoring, sprint breakdown, CI/CD, and fewer repeat defects.</p>
            </div>
          </div>

          <p>
            I completed my M.Sc. in Computer Science at Algoma University with a 3.9 GPA, and I keep
            building practical projects that prove range: a multi-tenant RBAC task board,
            MailGenieAI for Gmail, and a Canada crime forecasting pipeline.
          </p>

          <p>Technologies I have been working with recently:</p>

          <ul className="skills-list">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={620}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Meet Adalaja"
            />
          </div>
          <div className="profile-meta">
            <p>
              <span>Base</span>
              Ontario, Canada
            </p>
            <p>
              <span>Education</span>
              M.Sc. CS, 3.9 GPA
            </p>
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
