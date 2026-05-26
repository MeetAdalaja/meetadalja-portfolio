import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  min-height: 92vh;
  max-width: 1180px;
  padding: 118px 0 72px;

  @media (max-height: 760px) and (min-width: 900px), (max-width: 480px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  .hero-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.72fr);
    gap: 44px;
    align-items: center;

    @media (max-width: 960px) {
      grid-template-columns: 1fr;
      gap: 42px;
    }
  }

  .kicker {
    margin: 10px 0 18px 0;
    color: var(--amber);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin-bottom: 16px;
    }
  }

  h1 {
    color: var(--white);
    font-size: clamp(52px, 7vw, 82px);
  }

  h2 {
    margin-top: 5px;
    color: var(--light-slate);
    font-size: clamp(42px, 5vw, 68px);
    line-height: 0.95;
  }

  .summary {
    margin: 22px 0 0;
    max-width: 680px;
    color: var(--light-slate);
    font-size: clamp(var(--fz-lg), 1.8vw, 20px);
    line-height: 1.45;
  }

  .metric-strip {
    display: grid;
    grid-template-columns: repeat(4, minmax(110px, 1fr));
    gap: 10px;
    margin-top: 24px;
    max-width: 720px;

    @media (max-width: 720px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 420px) {
      grid-template-columns: 1fr;
    }
  }

  .metric {
    padding: 14px;
    border: 1px solid rgba(244, 247, 243, 0.1);
    border-radius: var(--border-radius);
    background-color: rgba(19, 32, 29, 0.72);

    span {
      display: block;
      color: var(--white);
      font-family: var(--font-mono);
      font-size: var(--fz-xl);
      line-height: 1;
    }

    small {
      display: block;
      margin-top: 8px;
      color: var(--slate);
      font-size: var(--fz-xs);
      line-height: 1.3;
    }
  }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 30px;
  }

  .hero-link {
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

  .signal-panel {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(244, 247, 243, 0.12);
    border-radius: var(--border-radius);
    background: linear-gradient(155deg, rgba(53, 240, 189, 0.12), rgba(19, 32, 29, 0.88) 42%),
      var(--light-navy);
    box-shadow: 0 34px 80px -48px var(--navy-shadow);

    @media (max-width: 960px) {
      max-width: 680px;
    }

    &:after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px);
      background-size: 100% 18px;
      pointer-events: none;
    }
  }

  .panel-top {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 16px 18px;
    border-bottom: 1px solid rgba(244, 247, 243, 0.1);
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .lights {
    display: flex;
    gap: 7px;

    span {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: var(--green);

      &:nth-child(2) {
        background: var(--amber);
      }

      &:nth-child(3) {
        background: var(--pink);
      }
    }
  }

  .panel-body {
    position: relative;
    z-index: 1;
    padding: 24px;
  }

  .status {
    margin-bottom: 24px;

    .label {
      margin: 0 0 8px;
      color: var(--amber);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
    }

    strong {
      color: var(--white);
      font-size: clamp(26px, 4vw, 38px);
      line-height: 1.05;
    }
  }

  .signal-row {
    display: grid;
    grid-template-columns: 100px 1fr auto;
    gap: 12px;
    align-items: center;
    padding: 14px 0;
    border-top: 1px solid rgba(244, 247, 243, 0.1);
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);

    @media (max-width: 420px) {
      grid-template-columns: 1fr;
      gap: 8px;
    }
  }

  .rail {
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(244, 247, 243, 0.1);

    span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--green), var(--blue));
    }
  }

  .panel-note {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 24px;

    @media (max-width: 520px) {
      grid-template-columns: 1fr;
    }

    p {
      margin: 0;
      padding: 16px;
      border: 1px solid rgba(244, 247, 243, 0.1);
      border-radius: var(--border-radius);
      color: var(--light-slate);
      font-size: var(--fz-sm);
      line-height: 1.35;

      span {
        display: block;
        margin-bottom: 6px;
        color: var(--white);
        font-family: var(--font-mono);
      }
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const metrics = [
    ['200+', 'daily users supported'],
    ['2.2s -> 1.2s', 'p95 latency improved'],
    ['100+', 'REST endpoints shipped'],
    ['5-level', 'RBAC product model'],
  ];

  const copyItems = [
    <p key="kicker" className="kicker">
      Full-stack developer & team lead
    </p>,
    <h1 key="name" className="big-heading">
      Meet Adalaja.
    </h1>,
    <h2 key="headline" className="big-heading">
      I build secure, fast product experiences.
    </h2>,
    <p key="summary" className="summary">
      I turn fuzzy product problems into clean interfaces, predictable APIs, and releases that teams
      can trust. My work spans React, Angular, Next.js, Node/NestJS, SQL/MongoDB, JWT/RBAC, CI/CD,
      and performance tuning with measurable business impact.
    </p>,
    <div key="metrics" className="metric-strip">
      {metrics.map(([value, label]) => (
        <div className="metric" key={label}>
          <span>{value}</span>
          <small>{label}</small>
        </div>
      ))}
    </div>,
    <div key="cta" className="cta-row">
      <a className="hero-link primary" href="#projects">
        Explore Work
      </a>
      <a className="hero-link" href="/resume.pdf" target="_blank" rel="noreferrer">
        Download Resume
      </a>
    </div>,
  ];

  const signalPanel = (
    <aside className="signal-panel" aria-label="Selected engineering impact">
      <div className="panel-top">
        <div className="lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>impact.log</span>
      </div>
      <div className="panel-body">
        <div className="status">
          <p className="label">current signal</p>
          <strong>Product engineer with a security and reliability bias.</strong>
        </div>

        <div className="signal-row">
          <span>checkout</span>
          <div className="rail">
            <span style={{ width: '82%' }} />
          </div>
          <span>+$180K</span>
        </div>
        <div className="signal-row">
          <span>MTTR</span>
          <div className="rail">
            <span style={{ width: '72%' }} />
          </div>
          <span>-45%</span>
        </div>
        <div className="signal-row">
          <span>release</span>
          <div className="rail">
            <span style={{ width: '64%' }} />
          </div>
          <span>8 &rarr; 4/qtr</span>
        </div>

        <div className="panel-note">
          <p>
            <span>Security</span>
            JWT, RBAC, OpenAPI, validation, webhooks, idempotency.
          </p>
          <p>
            <span>Delivery</span>
            PR standards, mentoring, CI/CD, Docker, Azure/AWS parity.
          </p>
        </div>
      </div>
    </aside>
  );

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <div className="hero-layout">
          <div>
            {copyItems.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>
          {signalPanel}
        </div>
      ) : (
        <div className="hero-layout">
          <div>
            <TransitionGroup component={null}>
              {isMounted &&
                copyItems.map((item, i) => (
                  <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                    <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </div>
          <TransitionGroup component={null}>
            {isMounted && (
              <CSSTransition classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: '700ms' }}>{signalPanel}</div>
              </CSSTransition>
            )}
          </TransitionGroup>
        </div>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
