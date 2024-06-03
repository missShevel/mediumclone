import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'mediumclone',
    password: '123',
    database: 'medium_db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    
};

export default config;

