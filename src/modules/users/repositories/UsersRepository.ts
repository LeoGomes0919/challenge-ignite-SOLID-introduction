import { User } from "../model/User";
import {
  IUsersRepository,
  ICreateUserDTO,
} from "./implementations/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const checkUserIfExists = this.users.find((user) => user.id === id);

    return checkUserIfExists;
  }

  findByEmail(email: string): User | undefined {
    const checkUserIfExists = this.users.find((user) => user.email === email);

    return checkUserIfExists;
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );

    const user = this.users[userIndex];
    user.admin = true;
    user.updated_at = new Date();

    const updateUser = {
      ...user,
      admin: true,
      updated_at: new Date(),
    };

    return updateUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
