import { Action } from 'routing-controllers';
import validateJwt from './jwt';

async function authorizationChecker(action: Action): Promise<boolean> {
  if (process.env.NODE_ENV === 'development') {
    const currentUser = process.env.CURRENT_USER;
    if (currentUser) {
      return true;
    }
  }

  try {
    const decodedJwt = await validateJwt(action.request.headers.authorization);

    const emailWhitelist = process.env.EMAIL_WHITELIST?.split(' ');
    if ('email' in decodedJwt && emailWhitelist) {
      for (let i = 0; i < emailWhitelist.length; i += 1) {
        if (emailWhitelist[i].trim() === decodedJwt.email) {
          return true;
        }
      }

      return false;
    }

    return !!decodedJwt;
  } catch (err) {
    return false;
  }
}

export default authorizationChecker;
