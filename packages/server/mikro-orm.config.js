import 'dotenv/config';

export default {
  type: 'postgresql',
  clientUrl: process.env['DATABASE_URL'],
  dbName: process.env['DATABASE_NAME'],
  entities: ['dist/entities/*.js'],
  entitiesTs: ['src/entities/*.ts'],
  seeder: {
    pathTs: 'test/seeders',
    defaultSeeder: 'default',
  },
};
