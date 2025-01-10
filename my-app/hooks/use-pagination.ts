import { ApiResponse } from "@/interfaces/api-response";
import { PaginatedRequest } from "@/interfaces/paginated-request";
import { Pagination } from "@/interfaces/pagination";
import * as React from "react";

interface PaginationOptions<T> {
  fetchRequest: (
    params: PaginatedRequest,
  ) => Promise<ApiResponse<Pagination<T>>>;
  limit?: number;
  fetchFirstPage?: boolean;
}

export function usePagination<T>(options: PaginationOptions<T>) {
  const [limit, setLimit] = React.useState(options.limit ?? 20);
  const [offset, setOffset] = React.useState(0);
  const [pagesEnded, setPagesEnded] = React.useState(false);

  const [fetchedData, setFetchedData] = React.useState<T[]>([]);

  async function fetchNextPage() {
    if (!pagesEnded) {
      const response = await options.fetchRequest({ limit, offset });
      if (response.data) {
        setFetchedData([...fetchedData, ...response.data.nodes]);
        setOffset(response.data.pageInfo.offset + response.data.pageInfo.limit);
        setPagesEnded(!response.data.pageInfo.hasNextPage);
      }
    }
  }

  React.useEffect(() => {
    if (options.fetchFirstPage !== false) {
      fetchNextPage();
    }
  }, []);

  return {
    fetchedData,
    setPageSize: setLimit,
    fetchNextPage,
    pagesEnded,
  };
}
