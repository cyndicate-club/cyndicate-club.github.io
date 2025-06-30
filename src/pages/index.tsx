import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
            {siteConfig.title}
          </Heading>
          <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
            {siteConfig.tagline}
          </p>
          <p className={styles.heroDescription}>
            <strong>Invest Smarter. Earn More. Trade Seamlessly.</strong>
          </p>
          <p className={styles.heroSubDescription}>
            Cyndicate Club represents the evolution of real estate investing—offering fractional, liquid, blockchain-enabled opportunities. Access a diversified global property portfolio, enhance returns through DeFi strategies, and trade real estate assets seamlessly.
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro">
              Get Started
            </Link>
            <Link
              className="button button--secondary button--lg"
              href="https://www.cyndicate.club"
              target="_blank">
              Launch Platform
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.heroBackground}></div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Blockchain-Powered Real Estate Investments`}
      description="Unlock higher returns with blockchain-powered real estate investments. Access tokenized properties, fractional ownership, and DeFi strategies with Cyndicate Club.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
