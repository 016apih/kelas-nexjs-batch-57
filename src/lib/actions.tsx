import moment from 'moment';
import { prisma } from '@/lib/prisma';

export const getUserByEmail = async (email:string, password:string="") => {
   try {
      let user = await prisma.users.findUnique({
         where: { email }
      });
      console.log(moment().format('DD-MM-YYYY HH:mm:ss:SSS'), " GET-USER-BY-EMAIL-1", email, user)

      if(!user){
         const newUser = await prisma.users.create({
            data: { 
               email, 
               password, fullname: email.split("@")[0], 
               role: email.includes('guest') ? "GUEST" : "USER"
            }
         });
         user = newUser;
      }

      console.log(moment().format('DD-MM-YYYY HH:mm:ss:SSS'), " GET-USER-BY-EMAIL-2", email, user)

      return user;
   } catch (error) {
      console.log(error)
      throw new Error("Failed to fetch user data");
   }
}
