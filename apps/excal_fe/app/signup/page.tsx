"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "../components/Button";
import { InputBox } from "../components/input";
import { useState } from "react";

export default function SignUp(){
    const [username, setusername] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const router = useRouter();
    
    async function signup_req(){
        const data = { username , email , password};
        try{
            const res = await axios.post("http://localhost:8000/api/v1/signup", data);
            alert(res.data.message);
            router.push("/");
        }catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                alert(e.response?.data?.message || "Something went wrong");
            } else {
                alert("Server not reachable!");
            }
            console.error(e);
        }
    }
    
    return(
        <div className="w-screen h-screen grid place-content-center bg-[#ece9e2]">
            <div className="border rounded-xl py-10 px-12">
                <span className="lg:text-4xl md:text-2xl text-xl font-serif">Sign Up</span>
                <div className="mt-6" >
                    <InputBox inputTitle="Username :" type="text" placeholder="John Doe" size="md" value={username} onChange={(e) => setusername(e.target.value)} />
                    <InputBox  inputTitle="Email :" type="email" placeholder="johndoe@zohomail.com" size="md" value={email} onChange={(e) => setemail(e.target.value)}/>
                    <InputBox inputTitle="Password :" type="password" placeholder="#johnDoe123" size="md" value={password} onChange={(e) => setpassword(e.target.value)}/>
                </div>
                <div className="grid place-content-center mt-5">
                    <Button name="SignUp" variant="primary" size="md" onClick={signup_req} />
                </div>
            </div>
        </div>
    )
}