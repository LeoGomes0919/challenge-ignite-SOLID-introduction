import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/implementations/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found");
    }
    const updateRole = this.usersRepository.turnAdmin(user);
    return updateRole;
  }
}

export { TurnUserAdminUseCase };
