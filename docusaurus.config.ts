import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Cyndicate Club',
  tagline: 'Unlock Higher Returns with Blockchain-Powered Real Estate Investments',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.cyndicate.club',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'cyndicate-club', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/cyndicate-club/docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      logo: {
        alt: 'Cyndicate Club Logo',
        src: 'img/cyndicate-logo.svg',
      },
      items: [
        {
          href: 'https://marketplace.cyndicate.club/analytics',
          label: 'Market Analytics',
          position: 'left',
          className: 'navbar-market-link',
        },
        {
          href: 'https://marketplace.cyndicate.club/',
          label: 'Portfolio Builder',
          position: 'left',
          className: 'navbar-portfolio-builder-link',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
          className: 'navbar-docs-link',
        },
        {
          href: 'https://www.cyndicate.club/signup',
          label: 'Sign Up',
          position: 'right',
          className: 'navbar-signup-btn',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Platform',
          items: [
            {
              label: 'Market',
              href: 'https://www.cyndicate.club',
            },
            {
              label: 'Funds',
              href: 'https://www.cyndicate.club/funds',
            },
            {
              label: 'Explorer',
              href: 'https://www.cyndicate.club/explorer',
            },
            {
              label: 'Portfolio',
              href: 'https://www.cyndicate.club/portfolio',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Documentation',
              to: '/docs/intro',
            },
            {
              label: 'API Reference',
              to: '/docs/intro',
            },

          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/cyndicate',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/cyndicateclub',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/cyndicateclub',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/cyndicate-club',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About Us',
              href: 'https://www.cyndicate.club/about',
            },
            {
              label: 'Careers',
              href: 'https://www.cyndicate.club/careers',
            },
            {
              label: 'Contact',
              href: 'https://www.cyndicate.club/contact',
            },
            {
              label: 'Legal',
              href: 'https://www.cyndicate.club/legal',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Cyndicate Club. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
