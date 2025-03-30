import type { Comment } from "@prisma/client";
import { db } from "..";
import { cache } from "react";

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

// export async function fetchCommentByPostId(
//   postId: string
// ): Promise<CommentWithAuthor[]> {

export const fetchCommentByPostId = cache(
  (postId: string): Promise<CommentWithAuthor[]> => {
    console.log("Introducing duplicate queries");

    return db.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  }
);
