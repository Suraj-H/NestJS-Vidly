// const ormconfig = {
//   synchronize: false,
//   migrations: ['migrations/*.js'],
//   cli: {
//     migrationsDir: 'migrations'
//   }
// }

// switch (process.env.NODE_ENV) {
//   case 'development':
//     Object.assign(ormconfig, {
//       type: 'postgres',
//       host: process.env.DATABASE_HOST,
//       port: +process.env.DATABASE_PORT,
//       username: process.env.DATABASE_USERNAME,
//       password: process.env.POSTGRES_PASSWORD,
//       database: process.env.POSTGRES_DB,
//       entities: ['**/*.entity.js'],
//     })
//     break;
//   case 'test':
//     Object.assign(ormconfig, {
//       type: 'postgres',
//       host: process.env.DATABASE_HOST,
//       port: +process.env.DATABASE_PORT,
//       username: process.env.DATABASE_USERNAME,
//       password: process.env.POSTGRES_PASSWORD,
//       database: process.env.POSTGRES_DB,
//       entities: ['**/*.entity.ts'],
//     })
//     break;
//   case 'production':
//     break;
//   default:
//     throw new Error('unknown environment');
// }


// module.export = ormconfig;