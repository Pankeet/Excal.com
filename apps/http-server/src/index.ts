import express from "express";
import jwt from "jsonwebtoken";
import * as z from "zod";
import { prisma } from "@repo/db-neon";

const app = express()
app.use(express.json());

const User = z.object({
    username : z.string().trim(),
    email : z.email().trim().regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/),
    password : z.string().trim().min(5)
})


app.post("/signup", async (req , res) => {
    const userDetails = await User.safeParseAsync(req.body);
    
    if(!userDetails.success) return res.status(400).json({
        message : "Please enter the correct type of credentials"
    })
    else{

    }

});

// app.post("/signin", (req , res) => {
    
// });

// app.post("/room", (req , res) => {
    
// })