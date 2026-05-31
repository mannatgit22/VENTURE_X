import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });
          console.log("SIGNIN PROFILE ID:", id);
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {

      console.log("JWT PROFILE:", profile);
      console.log("JWT PROFILE ID:", profile?.id);


      if (profile?.id) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: String(profile.id),
      });

        console.log("FETCHED USER:", user);

        token.id = user?._id;

        console.log("TOKEN ID:", token.id);

        }


        else if (!token.id && token.sub) {
          const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: String(token.sub),
        });
          console.log("FETCHED USER FROM SUB:", user);

          token.id = user?._id;

          console.log("TOKEN ID FROM SUB:", token.id);

      }

      return token;
    },
    async session({ session, token }) {

      console.log("SESSION TOKEN:", token);

      console.log("SESSION BEFORE:", session);
      Object.assign(session, { id: token.id });

      console.log("SESSION AFTER:", session);
      return session;
    },
  },
});