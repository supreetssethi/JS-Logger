module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    return await db.createCollection("logs", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["data"],
          properties: {
            data: {
              bsonType: "string"
            },
          },
        },
      },
      validationLevel: "strict",
      validationAction: "error",
    });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    return await db.collection("logs").drop();
  },
};
