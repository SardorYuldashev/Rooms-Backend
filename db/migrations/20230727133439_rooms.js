/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('rooms', (table) => {
    table.increments('id');
    table.string('name', 50).notNullable().unique();
    table.integer('floor').notNullable();
    table.boolean('for_stuff').defaultTo(false).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('rooms');
};