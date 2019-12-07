import { UserForRegister } from './../UserForRegister.model';
import { MovieFull } from './movies_full/MovieFull.model';

export class UserFull {
  uData: {
    watchList: MovieFull[]
  };
  uId: string;
  uProfile: UserForRegister;
  profilePhotoUrl?: string;
}
