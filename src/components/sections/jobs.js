import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledJobsSection = styled.section`
  max-width: 1080px;

  .inner {
    display: grid;
    grid-template-columns: 260px minmax(0, 1fr);
    gap: 24px;

    @media (max-width: 760px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 760px) {
      min-height: 420px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 760px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 24px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 56px;
  padding: 0 18px;
  margin-bottom: 8px;
  border: 1px solid
    ${({ isActive }) => (isActive ? 'rgba(53, 240, 189, 0.45)' : 'rgba(244, 247, 243, 0.08)')};
  border-left: 3px solid
    ${({ isActive }) => (isActive ? 'var(--green)' : 'rgba(244, 247, 243, 0.08)')};
  border-radius: var(--border-radius);
  background-color: ${({ isActive }) =>
    isActive ? 'rgba(53, 240, 189, 0.1)' : 'rgba(19, 32, 29, 0.52)'};
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--light-slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 760px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 170px;
    padding: 0 15px;
    border-left: 1px solid
      ${({ isActive }) => (isActive ? 'rgba(53, 240, 189, 0.45)' : 'rgba(244, 247, 243, 0.08)')};
    border-bottom: 3px solid
      ${({ isActive }) => (isActive ? 'var(--green)' : 'rgba(244, 247, 243, 0.08)')};
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: rgba(53, 240, 189, 0.08);
  }
`;

const StyledHighlight = styled.div`
  display: none;
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 28px;
  border: 1px solid rgba(244, 247, 243, 0.1);
  border-radius: var(--border-radius);
  background: linear-gradient(150deg, rgba(246, 189, 96, 0.08), rgba(19, 32, 29, 0.82) 34%),
    var(--light-navy);

  @media (max-width: 480px) {
    padding: 22px;
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--green);
    }
  }

  .job-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 25px;
  }

  .range,
  .location {
    margin: 0;
    padding: 7px 10px;
    border: 1px solid rgba(244, 247, 243, 0.08);
    border-radius: 999px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    line-height: 1;
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">Where I’ve Worked</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { company } = node.frontmatter;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{company}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight />
        </StyledTabList>

        <StyledTabPanels>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, url, company, range, location } = frontmatter;

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    <h3>
                      <span>{title}</span>
                      <span className="company">
                        &nbsp;@&nbsp;
                        <a href={url} className="inline-link">
                          {company}
                        </a>
                      </span>
                    </h3>

                    <div className="job-meta">
                      <p className="range">{range}</p>
                      {location && <p className="location">{location}</p>}
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
