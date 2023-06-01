import { Action } from 'routing-controllers';
import { JwtPayload } from 'jsonwebtoken';
import validateJwt from './jwt';

async function currentUserChecker(action: Action): Promise<JwtPayload> {
  if (process.env.NODE_ENV === 'development') {
    const currentUser = process.env.CURRENT_USER;
    if (currentUser) {
      return { sub: currentUser };
    }
  }

  try {
    return await validateJwt(action.request.headers.authorization);
  } catch (err) {
    return null;
  }
}

export default currentUserChecker;
