import { useAuth, useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import GetParts from "@/components/GetParts";

const supabaseClient = async (supabaseAccessToken) => {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_KEY,
		{
			global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
		}
	);

	return supabase;
};

export default function Home() {
	const { isSignedIn, isLoading, user } = useUser();
	return (
		<>
			<Header />
			{isLoading ? (
				<></>
			) : (
				<main>
					<div>
						{isSignedIn ? (
							<>
								<div>Welcome {user.firstName}!</div>
								<GetParts />
							</>
						) : (
							<div>Sign in to access!</div>
						)}
					</div>
				</main>
			)}
		</>
	);
}

const Header = () => {
	const { isSignedIn } = useUser();

	return (
		<header>
			<div>Aletheia</div>
			{isSignedIn ? (
				<UserButton />
			) : (
				<div>
					<SignInButton />
					&nbsp;
					<SignUpButton />
				</div>
			)}
		</header>
	);
};
