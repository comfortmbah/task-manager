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
    ALTER TABLE tasks
    DROP CONSTRAINT
    tasks_user_id_fkey
  `);

  pgm.sql(`
    ALTER TABLE tasks
    ADD CONSTRAINT
    tasks_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE;
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`
    ALTER TABLE tasks
    DROP CONSTRAINT 
    tasks_user_id_fkey;
  `);

  pgm.sql(`
    ALTER TABLE tasks
    ADD CONSTRAINT
    tasks_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE NO ACTION;
  `)
};
