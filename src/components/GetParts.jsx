import { useEffect, useState } from "react";
import { useSession } from "@clerk/nextjs";

const AllParts = ({ setParts }) => {
	const { session } = useSession();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadParts = async () => {
			try {
				setLoading(true);
				const supabaseAccessToken = await session.getToken({
					template: "supabase",
				});
				const supabase = await supabaseClient(supabaseAccessToken);
				const { data: parts } = await supabase.from("Parts").select("*");
				setParts(parts);
			} catch (e) {
				alert(e);
			} finally {
				setLoading(false);
			}
		};
		loadParts();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>All Parts</h1>
			<ul>
				{parts.map((part, index) => (
					<li key={index}>{part.name}</li>
				))}
			</ul>
		</div>
	);
};

export default AllParts;
