module.exports = {
  async up(db) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    return db.createCollection("logs", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["data"],
          properties: {
            data: {
              bsonType: "string",
            },
          },
        },
      },
      validationLevel: "strict",
      validationAction: "error",
    });
  },

  async down(db) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    return db.collection("logs").drop();
  },
};
