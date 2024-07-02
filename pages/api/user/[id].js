// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
   const { id } = req.query

   try {
      const resp = await (await fetch(`https://dummyjson.com/users/${id}`)).json();
      res.status(200).json({ ...resp });
   } catch (error) {

   }
}
