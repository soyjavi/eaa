import Storage from 'vanilla-storage';

import { C } from '../common';

const { STORE } = C;

export default (req, res, next) => {
  const { authorization } = req;
  if (!authorization) throw new Error('Acceso no permitido.');

  const users = new Storage(STORE.USERS);
  const session = users.get('admins').findOne({ fingerprint: authorization });
  if (!session) throw new Error('Acceso no permitido.');

  req.session = session;

  return next();
};
