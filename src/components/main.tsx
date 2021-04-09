import { PropsWithChildren } from "react";

export default function Main({ children }: PropsWithChildren<unknown>) {
	return <main className="px-8 py-8 w-full max-w-prose mx-auto my-8 bg-white">{children}</main>;
}
