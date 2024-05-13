import FastifyServer from "./app";
import config from "./shared/config/config";
import InitializeMongoose from "./shared/config/database";

const server = FastifyServer();

async function main() {
  try {
    const PORT = config.apiPort;

    //Init MongoDb
    InitializeMongoose();

    await server.listen({
      port: PORT,
      host: "0.0.0.0",
    });

    console.log(`Server ready at http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
