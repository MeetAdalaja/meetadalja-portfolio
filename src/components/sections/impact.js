import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledImpactSection = styled.section`
  max-width: 1120px;
  padding-top: 30px;

  .section-heading {
    margin-bottom: 34px;
  }

  .intro {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(280px, 1.1fr);
    gap: 36px;
    align-items: end;
    margin-bottom: 28px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 12px;
    }
  }

  .eyebrow {
    margin: 0 0 12px;
    color: var(--amber);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  h2 {
    margin: 0;
    font-size: clamp(30px, 5vw, 56px);
    letter-spacing: 0;
  }

  .lead {
    margin: 0;
    color: var(--light-slate);
    font-size: clamp(var(--fz-lg), 2vw, var(--fz-xl));
  }

  .impact-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;

    @media (max-width: 980px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .impact-card {
    position: relative;
    min-height: 220px;
    padding: 24px;
    overflow: hidden;
    border: 1px solid rgba(244, 247, 243, 0.1);
    border-radius: var(--border-radius);
    background: linear-gradient(145deg, rgba(244, 247, 243, 0.08), rgba(19, 32, 29, 0.78)),
      var(--light-navy);
    box-shadow: 0 18px 50px -32px var(--navy-shadow);

    &:before {
      content: '';
      position: absolute;
      inset: 0;
      border-top: 3px solid var(--card-accent);
      opacity: 0.95;
    }
  }

  .value {
    display: block;
    margin-bottom: 14px;
    color: var(--white);
    font-family: var(--font-mono);
    font-size: clamp(30px, 6vw, 46px);
    line-height: 1;
  }

  .label {
    margin: 0 0 12px;
    color: var(--card-accent);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    text-transform: uppercase;
  }

  .detail {
    margin: 0;
    color: var(--light-slate);
    font-size: var(--fz-md);
    line-height: 1.45;
  }
`;

const impactStats = [
  {
    value: '$180K',
    label: 'annualized impact',
    detail: 'Improved cart, checkout, and order tracking flows for 200+ daily users.',
    accent: 'var(--amber)',
  },
  {
    value: '45%',
    label: 'lower MTTR',
    detail: 'Used logs, tracing, runbooks, and profiling to move faster from signal to fix.',
    accent: 'var(--green)',
  },
  {
    value: '100+',
    label: 'REST endpoints',
    detail: 'Built Node.js/NestJS APIs with validation, auth, MongoDB, SQL, and tests.',
    accent: 'var(--blue)',
  },
  {
    value: '6+',
    label: 'developers coached',
    detail: 'Led sprint planning, PR standards, and intern mentorship after a fast promotion.',
    accent: 'var(--pink)',
  },
];

const Impact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledImpactSection id="impact" ref={revealContainer}>
      <h2 className="numbered-heading section-heading">Impact Snapshot</h2>

      <div className="intro">
        <div>
          <p className="eyebrow">Proof before polish</p>
          <h2>Business, reliability, security, and team velocity.</h2>
        </div>
        <p className="lead">
          I like portfolios that make the work inspectable. These are the signals I want a hiring
          manager to remember before they even reach the project section.
        </p>
      </div>

      <div className="impact-grid">
        {impactStats.map(({ value, label, detail, accent }) => (
          <article className="impact-card" key={label} style={{ '--card-accent': accent }}>
            <span className="value">{value}</span>
            <p className="label">{label}</p>
            <p className="detail">{detail}</p>
          </article>
        ))}
      </div>
    </StyledImpactSection>
  );
};

export default Impact;
