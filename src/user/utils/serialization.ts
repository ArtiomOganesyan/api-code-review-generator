import { Exclude } from 'class-transformer';

export class SerializedUser {
  id: number;
  name: string;
  email: string;
  campus: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
