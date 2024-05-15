export const AllUserSchema = {
  schema: {
    tags: ["Users"],
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
};

export const CreateUserSchema = {
  schema: {
    body: {
      name: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
      role: { type: "string", default: "user" },
    },
    required: ["name", "email", "password"],
    tags: ["Users"],
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
};

export const UpdateUserSchema = {
  schema: {
    body: {
      name: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
      role: { type: "string", default: "user" },
    },
    tags: ["Users"],
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
};

export const DeleteUserSchema = {
  schema: {
    params: {
      id: { type: "string" },
    },
    required: ["id"],
    tags: ["Users"],
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
};
