import { siteConfigs } from '@/configs/site.configs'

export const copyConfigs = {
  site: {
    title: siteConfigs.title,
    heroTitle: siteConfigs.heroTitle,
    description: siteConfigs.description,
    keywords: siteConfigs.keywords.join(','),
  },
  navbar: {
    title: 'Press Engine',
  },
  search: {
    searchbarPlaceholders: {
      global: () => 'Search through the LPE posts...',
      article: () => `Search through the article or switch to `,
    },
    views: {
      default: 'List',
      explore: 'Explore',
    },
    results: {
      noResults: 'No results found',
      results: 'results',
    },
    labels: {
      topResults: 'Top results',
      articlesAndPodcasts: 'Articles and podcasts',
      relatedContent: 'Related content',
    },
    filterTags: [
      'Privacy',
      'Security',
      'Liberty',
      'Censorship',
      'Decentralization',
      'Openness / inclusivity',
      'Innovation',
      'Interview',
      'Podcast',
      'Law',
    ],
  },
}
