import { TeaRefactor1654375238934 } from 'src/migrations/1654375238934-TeaRefactor';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',

  //you can add entities here so if any change happened to then you run the last command so type orm generate migration for you
  entities: [],

  //what migration should be execute
  migrations: [TeaRefactor1654375238934],
});

/* RUNNING MIGRATIONS */

/**
 * 💡 Remember 💡
 * You must BUILD your Nest project (so that everything is output to the `/dist/` folder,
 * before a Migration can run, it needs completed files.
 */

/* Compile project first 
   npm run build

Run migration(s) 
 npx typeorm migration:run -d dist/typeorm-cli.config

REVERT migration(s)
 npx typeorm migration:revert -d dist/typeorm-cli.config

Let TypeOrm generate migrations (for you)
 npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config
*/
