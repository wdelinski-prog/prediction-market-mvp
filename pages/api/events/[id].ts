import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const response = await fetch(`https://polymarket-api.com/api/tools/polymarket/markets/${id}`);
  const data = await response.json();
  res.status(200).json(data);
}