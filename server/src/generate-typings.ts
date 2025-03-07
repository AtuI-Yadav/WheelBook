import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
void definitionsFactory.generate({
  typePaths: ['./assets/**/*.graphql'],
  path: join(process.cwd(), './assets/graphql/generated-graphql.ts'),
  outputAs: 'class',
  watch: true,
});
