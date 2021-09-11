import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/implementations/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const checkUserIfExists = this.usersRepository.findById(user_id);

    if (!checkUserIfExists) {
      throw new Error("User not found");
    }

    if (checkUserIfExists) {
      console.log(checkUserIfExists.admin);
      if (checkUserIfExists.admin !== true) {
        throw new Error("Listing released to admin Users only");
      }
    }
    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
