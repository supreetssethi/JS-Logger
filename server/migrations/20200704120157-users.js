module.exports = {
  async up(db) {
    return db.createCollection("users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["email", "password", "username"],
          properties: {
            email: {
              bsonType: "string",
              pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}",
            },
            password: {
              bsonType: "string",
            },
            username: {
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
    return db.collection("users").drop();
  },
};
