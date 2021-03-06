// orders-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import Knex from "knex";
import { Application } from "../declarations";

export default function (app: Application) {
  const db: Knex = app.get("knexClient");
  const tableName = "orders";
  db.schema.hasTable(tableName).then((exists) => {
    if (!exists) {
      db.schema
        .createTable(tableName, (table) => {
          table.increments("id").primary();
          table
            .integer("customer_id")
            .references("id")
            .inTable("customers")
            .notNullable()
            .onDelete("cascade");
          table.string("customer_type");
        })
        .then(() => console.log(`Created ${tableName} table`))
        .catch((e) => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
}
