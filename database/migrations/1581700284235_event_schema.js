"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EventSchema extends Schema {
  up() {
    this.create("events", table => {
      table.increments();
      table
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .enu("type", ["participation", "dojo", "presentation", "pr"])
        .notNullable();
      table
        .integer("points")
        .notNullable()
        .unsigned()
        .default(0);
      table.date("date").notNullable();
      table.string("title").notNullable();
      table.string("location").notNullable();
      table.string("description");
      table.string("url");
      table.timestamps();
    });
  }

  down() {
    this.drop("events");
  }
}

module.exports = EventSchema;
