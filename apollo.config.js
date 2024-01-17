module.exports = {
  client: {
    includes: ['src/**/*.{ts,tsx}'],
    service: {
      name: 'strapi-graphql',
      localSchemaFile: [
        './src/lib/strapi/strapi.graphql',
      ], // how to configure to multiple schemas?
    },
  },
}
