export interface Pagination<T> {
  count: number;
  nodes: T[];
  pageInfo: {
    limit: number;
    offset: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
