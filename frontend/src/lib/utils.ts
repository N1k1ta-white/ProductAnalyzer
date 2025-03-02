import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function damerauLevenshtein(a: string, b: string): number {
  const m: number = a.length;
  const n: number = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost: number = a[i - 1] === b[j - 1] ? 0 : 1;

      dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // Удаление
          dp[i][j - 1] + 1,     // Вставка
          dp[i - 1][j - 1] + cost // Замена
      );

      // Проверка на транспозицию (перестановку соседних символов)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost);
      }
    }
  }

  return dp[m][n];
}


