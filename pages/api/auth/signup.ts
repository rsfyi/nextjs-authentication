import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';

const saltRounds = 10;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const hashed_password = await hash(req.body.password, saltRounds);
    // save hashed password to database
    res.status(200).json({ messgae: 'welcome to signup page' });
  }

  if (req.method === 'GET') {
    res.status(200).json({ messgae: 'welcome to signup get page' });
  }
}
