import PostCreateForm from "@/components/posts/postCreateForm";

interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function page({ params }: TopicShowPageProps) {
  const { slug } = await params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="font-bold text-2xl mb-2">{slug}</h1>
      </div>

      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
