/* import getPool from './database/connection';
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

export default async (req, res) => {
    if (req.method === "POST")
    {
        const {firstName, lastName, email, password} = req.body;

        try
        {
            const hash = await bcrypt.hash(password, 0);
            await prisma.users.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash
                }
            });

            return res.status(200).end();
        }
        catch (err)
        {
            return res.status(503).json({err: err.toString()});
        }
    }
    else
    {
        return res.status(405).json({error: "This request only supports POST requests"})
    }
} */

const register = () => {
  return <div>register</div>;
};

export default register;
