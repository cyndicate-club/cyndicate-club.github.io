import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Global Access Without Barriers',
    icon: '🌍',
    description: (
      <>
        A single platform to explore over 1,000 tokenized properties across 5 countries.
        Invest from anywhere—free from the restrictions of traditional real estate markets.
      </>
    ),
  },
  {
    title: 'Fractional Ownership for Everyone',
    icon: '🏠',
    description: (
      <>
        Build a real estate portfolio starting with just $50.
        Compete with institutional investors—without needing millions in capital.
      </>
    ),
  },
  {
    title: 'Compound Growth & Passive Income',
    icon: '📈',
    description: (
      <>
        Reinvest monthly rental earnings to accelerate portfolio appreciation.
        Deploy smart reinvestment strategies for maximum long-term ROI.
      </>
    ),
  },
  {
    title: 'Unlocked Liquidity & DeFi Strategies',
    icon: '🔓',
    description: (
      <>
        Trade instantly on the secondary market—eliminating lengthy sales cycles.
        Use real estate tokens as collateral for loans and yield-generating DeFi strategies.
      </>
    ),
  },
  {
    title: 'AI-Driven Portfolio Builder',
    icon: '🤖',
    description: (
      <>
        Analyze & compare over 1,000 tokenized real estate deals across 9 blockchains.
        Get AI-powered insights to identify properties with the highest ROI potential.
      </>
    ),
  },
  {
    title: 'On-Chain Transparency',
    icon: '🔗',
    description: (
      <>
        Get instant access to financial performance metrics through the Portfolio Tracker.
        Full transparency with blockchain-verified property data and returns.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
          <span className={styles.icon}>{icon}</span>
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            Why Invest with Cyndicate Club?
          </Heading>
          <p className={styles.featuresSubtitle}>
            The evolution of real estate investing—offering fractional, liquid, blockchain-enabled opportunities
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <div className={styles.complianceSection}>
          <div className={styles.complianceContent}>
            <Heading as="h3" className={styles.complianceTitle}>
              Fully Compliant & Secure
            </Heading>
            <p className={styles.complianceDescription}>
              Integrated with leading blockchains: Ethereum, Polygon, Arbitrum, Base, Algorand, Binance Smart Chain, and Hedera.
              Fully compliant under CIMA (Cayman Islands), MiCA (EU), QFC (Qatar), and MAS (Singapore).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
