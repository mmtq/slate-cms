'use client';

import { toast } from "sonner";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth-client";

interface Props {

}

const SocialProviders = ({ }: Props) => {

    const handleGoogleLogin = async () => {
        await signIn.social({
            provider: 'google',
            callbackURL: '/',
        });

    }

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* OR Divider */}
            <div className="flex items-center w-full max-w-sm">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-400 text-sm font-medium">OR</span>
                <hr className="flex-grow border-gray-300" />
            </div>

            {/* Google Button */}
            <Button variant={'outline'} type='button' onClick={handleGoogleLogin} className="flex items-center gap-2 rounded-full px-6 py-2 cursor-pointer">
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                />
                <span className="text-sm font-medium">Continue with Google</span>
            </Button>
        </div>

    );
};

export default SocialProviders;