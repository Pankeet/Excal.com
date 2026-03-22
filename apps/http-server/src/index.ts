import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as z from "zod";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { DATABASE_URL as connectionString } from "@repo/backend-secret/dist/index.js";
import { SALT_ROUNDS  } from "@repo/backend-secret/dist/index.js";
import { JWT_SECRET } from "@repo/backend-secret/dist/index.js"; 

const app = express()
app.use(express.json());
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const User = z.object({
    username : z.string(),
    email : z.email(),
    password : z.string().trim().min(5)
})

// SignUp Endpoint Completed (✔️)
app.post("/signup", async (req , res) => {
    const userDetails = User.safeParse(req.body);
    if(!userDetails.success) {
        return res.status(422).json({
            message : "Invalid Semantics"
        });
    }   
    else{
        const { username, email, password } = req.body;
        const findExsistence = await prisma.user.findUnique({where:{email:email}})
        if(!findExsistence){
            try{
                const hash_password = await bcrypt.hash(password , SALT_ROUNDS );
                const user = await prisma.user.create({
                    data:{
                        username : username,
                        email : email,
                        password : hash_password
                    }
                });
                return res.status(201).json({
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
            return res.status(409).json({
                message : "User already Exsists !"
            })
        }
    }
});


// SigIn Endpoint Completed (✔️)
app.post("/signin", async (req , res) => {
    const { username, password } = req.body;
    const findUser = await prisma.user.findMany({where : {username: username}});
    if(findUser.length === 0) return res.status(401).json({
        message : "User does not Exsists !"
    })
    else{
        for (const user of findUser){
            var password_cmp = await bcrypt.compare(password, user.password)
            if(password_cmp) {
                const token = jwt.sign({userId : user.id,email : user.email},JWT_SECRET,{"expiresIn": '1h'});
                return res.status(200).json({
                    message : "Signin Successful",
                    token : token
                })
            }
        }
        return res.status(401).json({
            message : "Invalid Credentials !"
        });
    }
});

// Room Creation Endpoint
app.post("/room", (req , res) => {
    
})

app.listen(3001);