import { Router } from 'express';

import AuthenticateUserService from '../service/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({ email, password });
  const { password: pass, ...userWithOutPassword } = user;
  return response.json({ userWithOutPassword, token });
});

export default sessionsRouter;
