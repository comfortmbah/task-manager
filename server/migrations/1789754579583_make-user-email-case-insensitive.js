/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.sql(`
    ALTER TABLE users
    DROP CONSTRAINT
    users_email_key;
  `);

  pgm.sql(`
    CREATE UNIQUE INDEX 
    users_email_unique_idx
    ON users (LOWER(email));
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`
    DROP INDEX IF EXISTS
    users_email_unique_idx;
  `);

  pgm.sql(`
    ALTER TABLE users
    ADD CONSTRAINT users_email_key
    UNIQUE (email);
  `)
};
