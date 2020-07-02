import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const result = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await result.json();
      res
        .status(400)
        .json({ message: 'successfully sent users data', users: data });
    } catch (err) {
      res.status(400).json({ message: ` Error ${err.message}` });
    }
  }
}
