import express from "express";
import jwt from "jsonwebtoken";
import * as z from "zod";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { DATABASE_URL as connectionString } from "@repo/backend-secret/dist/index.js";

const app = express()
app.use(express.json());
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const User = z.object({
    username : z.string(),
    email : z.email(),
    password : z.string().trim().min(5)
})


app.post("/signup", async (req , res) => {
    const userDetails = User.safeParse(req.body);
    
    if(!userDetails.success) {
        return res.status(403).json({
            message : "Invalid Data"
        });
    }   
    else{
        const { username, email, password } = req.body;
        const findExsistence = await prisma.user.findUnique({where:{email:email}})

        if(!findExsistence){
            try{
                const user = await prisma.user.create({
                    data:{
                        username : username,
                        email : email,
                        password : password
                    }
                })
                return res.status(200).json({
                    message : "User Created Successfully !"
                });
        }   catch(err){
                console.error(err);
                return res.status(500).json({
                    message : "User cannot be created ! Please try again later "
                });
            }
        }   
        else{
            return res.status(403).json({
                message : "User already Exsists !"
            })
        }
    }
});

// app.post("/signin", (req , res) => {
    
// });

// app.post("/room", (req , res) => {
    
// })

app.listen(3001);