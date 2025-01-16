import * as React from "react";
import { ApiResponse } from "@/interfaces/api-response";
import { PaginatedRequest } from "@/interfaces/paginated-request";
import { Pagination } from "@/interfaces/pagination";

interface PaginationOptions<T> {
  fetchRequest: (
    params: PaginatedRequest,
  ) => Promise<ApiResponse<Pagination<T>>>;
  limit?: number;
  fetchFirstPage?: boolean;
}

const DEFAULT_PAGE_LIMIT = 20;

export function usePagination<T>(options: PaginationOptions<T>) {
  const limit = options.limit ?? DEFAULT_PAGE_LIMIT;
  const [offset, setOffset] = React.useState(0);
  const [pagesEnded, setPagesEnded] = React.useState(false);

  const [fetchedData, setFetchedData] = React.useState<T[]>([]);

  const fetchNextPage = React.useCallback(
    async function () {
      if (!pagesEnded) {
        const response = await options.fetchRequest({ limit, offset });
        if (response.data) {
          setFetchedData([...fetchedData, ...response.data.nodes]);
          setOffset(
            response.data.pageInfo.offset + response.data.pageInfo.limit,
          );
          setPagesEnded(!response.data.pageInfo.hasNextPage);
        }
      }
    },
    [limit, offset, fetchedData],
  );

  const resetList = React.useCallback(function () {
    setFetchedData([]);
    setOffset(0);
    setPagesEnded(false);
    if (options.fetchFirstPage !== false) {
      fetchNextPage();
    }
  }, []);

  React.useEffect(() => {
    if (options.fetchFirstPage !== false) {
      fetchNextPage();
    }
  }, []);

  return {
    fetchedData,
    fetchNextPage,
    resetList,
    pagesEnded,
  };
}
