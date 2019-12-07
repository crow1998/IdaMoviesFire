import { Dates } from './categories/Dates.model';
import { Result } from './categories/Result.model';

export class MovieCollection {
  results: Result[];
  page: number;
  total_results: number;
  dates: Dates;
  total_pages: number;
}
