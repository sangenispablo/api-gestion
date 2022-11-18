import { Request, Response } from "express";

import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename || "",
    });
    return response.json(user);
  }
}

export default UsersAvatarController;
