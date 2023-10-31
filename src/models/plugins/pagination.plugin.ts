// pagination in mongodb
import type { Model, Document } from "mongoose";

interface PaginationOptions {
  page: number;
  limit: number;
  pageSize: number;
  sort: string;
}

interface PaginationResults {
  results: unknown[];
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

const paginationPlugin = (schema: any) => {
  /**
   *
   * @param query - query to execute
   *  (e.g. { name: "John", age: { $gte: 18 } })
   * @param options - options for pagination
   *  (e.g. { page: 1, limit: 10, pageSize: 10, sort: "name" })
   * @returns
   */
  schema.statics.paginate = async function (
    query: any,
    options: PaginationOptions
  ) {
    const { page, limit, pageSize, sort } = options;
    const model: Model<Document> = this;

    const count = await model.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    const results = await model
      .find(query)
      .sort(sort)
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .exec();

    return {
      results,
      page,
      limit,
      totalPages,
      totalItems: count,
    } as PaginationResults;
  };
};

module.exports = paginationPlugin;
