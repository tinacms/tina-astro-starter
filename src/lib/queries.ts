import fragsGql from '../../tina/__generated__/frags.gql?raw';
import queriesGql from '../../tina/__generated__/queries.gql?raw';

function extractQuery(name: string): string {
  const queryRe = new RegExp(`^query ${name}\\([^)]*\\) {[\\s\\S]+?\\n}\\n`, 'm');
  const queryMatch = queriesGql.match(queryRe);
  if (!queryMatch) throw new Error(`query "${name}" not found in queries.gql`);
  const query = queryMatch[0];
  return [query, ...collectFragments(query)].join('\n');
}

function collectFragments(source: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  const visit = (input: string) => {
    const refs = input.matchAll(/\.\.\.([A-Z]\w+)\b/g);
    for (const ref of refs) {
      const name = ref[1];
      if (seen.has(name)) continue;
      const fragRe = new RegExp(`^fragment ${name} on \\w+ \\{[\\s\\S]+?\\n\\}\\n`, 'm');
      const fragMatch = fragsGql.match(fragRe);
      if (!fragMatch) continue;
      seen.add(name);
      visit(fragMatch[0]);
      result.push(fragMatch[0]);
    }
  };

  visit(source);
  return result;
}

export const PAGE_QUERY = extractQuery('page');
export const BLOG_QUERY = extractQuery('blog');
