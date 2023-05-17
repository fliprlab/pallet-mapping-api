import mongoose from "mongoose";

export class Config {
  async start() {
    try {
      // Connect to mondoDb
      await this.dbConnect(process.env.mondoDbUrl ?? "");
      console.log("mongodb", process.env.mondoDbUrl);
    } catch (error: any) {
      console.error("OOPS! ", error);
      throw new Error("error");
    }
  }

  private async dbConnect(url: string) {
    try {
      await mongoose.connect(url);
      console.log("Connected to DB");
    } catch (error: any) {
      console.error("DB Connection Error ", error);
    }
  }

  getBaseUrl(): string {
    return process.env.baseUrl ?? "";
  }
}
