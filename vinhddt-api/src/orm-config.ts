import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

const config: SqlServerConnectionOptions = {
  type: 'mssql',
  host: '103.200.22.248',
  port: 1743,
  username: 'sa',
  password: 'Gunviet@2023',// pass sql
  database: 'VinhDDT',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/databases/migrations/*.js'],
  cli: { migrationsDir: 'src/databases/migrations' },
  synchronize: false,
  extra: {
    trustServerCertificate: true,
  }
};

export default config;
