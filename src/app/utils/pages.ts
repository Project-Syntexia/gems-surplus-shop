export const pages = ["cart", "product", "settings", ""] as const;

export function pagesRouting(page: (typeof pages)[number]) {
  const PREFIX = "/";
  return `${PREFIX}${page}` as const;
}

export type PagesType = ReturnType<typeof pagesRouting>;
