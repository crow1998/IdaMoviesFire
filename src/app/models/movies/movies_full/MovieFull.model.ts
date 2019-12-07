import { Genre } from './categories/Genre.model';
import { BelongsToCollection } from './categories/BelongsToCollection.model';
import { ProductionCompany } from './categories/ProductionCompany.model';
import { ProductionCountry } from './categories/ProductionCountry.model';
import { SpokenLanguage } from './categories/SpokenLanguage.model';

export class MovieFull {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  add_date?: Date;
}
