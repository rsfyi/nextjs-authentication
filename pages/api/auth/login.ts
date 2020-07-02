import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

let hashed_password =
  '$2b$10$c0I60Zpd3B.8NHeMVra6LODPB.BA.Icu7mS3lkP6Eh/j3a1K9PklC';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // hashed password from db - saved in local memory here
    try {
      const isValidPassword = await compare(req.body.password, hashed_password);

      if (isValidPassword) {
        const claims = { sub: 1 };
        const accessToken = sign(
          claims,
          'c5548e74-e7c1-4f69-ad50-84d32a0381df',
          {
            expiresIn: '1hr',
          }
        );
        res
          .status(200)
          .json({ message: 'logged in successfully', accessToken });
      } else {
        res.status(200).json({ message: 'invalid credentials' });
      }
    } catch (err) {
      res
        .status(200)
        .json({ message: 'invalid credentials', err: err.message });
    }
  }
}
