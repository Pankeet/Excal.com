"use client";
import { useState } from "react";
import  axios  from "axios";
import { useRouter } from "next/navigation";
import { InputBox } from "../components/input";
import { Button } from "../components/Button";

export default function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function signin_req(){
        const data = {
            username, password
        }
        try{
            const res = await axios.post("http://localhost:8000/api/v1/signin", data);
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
                    <span className="lg:text-5xl md:text-2xl text-xl font-serif">Sign In</span>
                    <div className="mt-6">
                        <InputBox size="lg" inputTitle="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <InputBox type="password" size="lg" inputTitle="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="grid place-content-center mt-5">
                        <Button name="SignIn" variant="secondary" size="md" onClick={signin_req} />
                    </div>
                </div>
            </div>
        )
}