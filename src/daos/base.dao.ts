import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { MONGOURL } from "../utils/config";

// Set up default mongoose connection
const mongoDB: string = MONGOURL;
mongoose.set("strictQuery", false);
mongoose.connect(mongoDB);

// Get the default connection
const db = mongoose.connection;
logger.info(`✅ Base de datos conectada correctamente.`);

// Bind connection to error event (to get notification of connection errors)
db.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
});

export class BaseDao<T extends mongoose.Document> {
  private collection: mongoose.Model<T>;

  constructor(model: mongoose.Model<T>) {
    this.collection = model;
  }

  async getAll(): Promise<T[] | undefined> {
    try {
      const data: T[] = await this.collection.find();
      return data;
    } catch (err) {
      logger.error(err);
    }
  }

  async getById(id: string): Promise<T | null | undefined> {
    try {
      const data: T | null = await this.collection.findOne({ _id: id });
      return data;
    } catch (err) {
      logger.error(err);
    }
  }

  async save(objeto: T): Promise<T | undefined> {
    try {
      const doc = await this.collection.create(objeto);
      return doc;
    } catch (err) {
      logger.error(err);
    }
  }

  async update(id: string, newObject: T): Promise<T | boolean | undefined | null> {
    try {
      const objetoBuscado = await this.getById(id);
      if (!objetoBuscado) {
        return false; //No encontrado
      } else {
        const data = await this.collection.findByIdAndUpdate(id, {newObject});
        return data;
      }
    } catch (err) {
      logger.error(err);
    }
  }

  async deleteById(id: string): Promise<T | boolean | undefined | null> {
    try {
      const objetoBuscado = await this.getById(id);
      if (!objetoBuscado) {
        return false;
      } else {
        const data = await this.collection.findByIdAndDelete(id);
        return data;
      }
    } catch (err) {
      logger.error(err);
    }
  }
}
