import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function(){
    return(
        <div className="w-full p-12 px-5">
            <h1 className="text-3xl font-normal text-center">Login</h1>
            <form action="" method="post" className="space-y-3">
                <div className="grid gap-1">
                    <label className="" htmlFor="email">Email <span className="text-orange-600"> *</span></label>
                    <Input type={"email"} />
                </div>
                <div className="grid gap-1">
                    <label className="" htmlFor="password">Password <span className="text-orange-600"> *</span></label>
                    <Input type={"email"} />
                    <p className="text-right text-sm">Forgot password?</p>
                </div>

                <Button className={"w-full h-11 my-1 bg-[#B5947C] border-none text-white"}>Login</Button>
                <p className="my-3">Don't have an account ? <span className="text-[#B5947C] font-medium">Signup</span></p>
            </form>
        </div>
    )
}