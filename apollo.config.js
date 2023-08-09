module.exports = {
  client: {
    includes: ['src/**/*.{ts,tsx}'],
    service: {
      name: 'unbody-graphql',
      localSchemaFile: [
        './src/lib/unbody/unbody.graphql',
        './src/lib/unbody/unbody.extend.graphql',
      ], // how to configure to multiple schemas?
    },
  },
}
