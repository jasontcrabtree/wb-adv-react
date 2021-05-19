import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long does a session lat (60sec * 60 min * 24 hr * 360)
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User', // what schema do we use for auth
  identityField: 'email', // how do we identify different users
  secretField: 'password', // authenticate users
  initFirstItem: {
    // lets us create an initial admin user ("Get Started by creating the first user") (or else you have auth and noway to create first user)
    fields: ['name', 'email', 'password'],
    // TODO: Add initial roles here
  },
});

/* KEYSTONE SERVER CONFIG */
export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO: Add data seeding here
      async onConnect(keystone) {
        //   if npm command is run with argument --seed-data (defined in npm scripts in package.json), then we run this. This ensures we run it once only
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // Schema items go here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // Show the UI only to people who pass the authorized test (e.g. only admin users)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    // User session argument
    session: withItemData(statelessSessions(sessionConfig), {
      // Ask for user ID every single time
    }),
  })
);
