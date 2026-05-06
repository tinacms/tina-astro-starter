import { readOverlay } from '@tinacms/astro/preview';
import { addContentSourceMetadata, hashFromQuery } from './metadata';

export interface QueryResult<T> {
  data: T;
  query: string;
  variables: Record<string, unknown>;
  id: string;
}

export async function withOverlay<T>(args: {
  query: string;
  variables: Record<string, unknown>;
  request: Request;
  fetcher: () => Promise<T | null | undefined>;
  defaults: T;
}): Promise<QueryResult<T>> {
  const { query, variables, request, fetcher, defaults } = args;
  const id = hashFromQuery(JSON.stringify({ query, variables }));

  const overlay = await readOverlay<T>(request, id);
  if (overlay !== undefined) {
    return {
      data: addContentSourceMetadata(id, overlay) as T,
      query,
      variables,
      id,
    };
  }

  const fetched = await fetcher().catch(() => null);
  return {
    data: addContentSourceMetadata(id, fetched ?? defaults) as T,
    query,
    variables,
    id,
  };
}
