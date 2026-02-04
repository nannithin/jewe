import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function(){
    return(
        <div className="w-full p-12 px-5">
            <h1 className="text-3xl font-normal text-center">Register</h1>
            <form action="" method="post" className="space-y-3">
                <div className="grid gap-1">
                    <label className="" htmlFor="email">Username <span className="text-orange-600"> *</span></label>
                    <Input type={"email"} />
                </div>
                <div className="grid gap-1">
                    <label className="" htmlFor="email">Email <span className="text-orange-600"> *</span></label>
                    <Input type={"email"} />
                </div>
                <div className="grid gap-1">
                    <label className="" htmlFor="password">Password <span className="text-orange-600"> *</span></label>
                    <Input type={"password"} />
                </div>
                <div className="grid gap-1">
                    <label className="" htmlFor="password">Confirm Password <span className="text-orange-600"> *</span></label>
                    <Input type={"password"} />
                </div>

                <Button className={"w-full h-11 my-1 bg-[#B5947C] border-none text-white"}>Register</Button>
                <p className="my-3">Already have an account ? <span className="text-[#B5947C] font-medium">Login</span></p>
            </form>
        </div>
    )
}