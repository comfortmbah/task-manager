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
    CREATE INDEX IF NOT EXISTS
    idx_tasks_user_id
    ON tasks(user_id);
  `);

  pgm.sql(`
    CREATE INDEX IF NOT EXISTS
    idx_tasks_user_completed
    ON tasks(user_id, completed);
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
    idx_tasks_user_id
  `);

  pgm.sql(`
    DROP INDEX IF EXISTS
    idx_tasks_user_completed
  `);
};
