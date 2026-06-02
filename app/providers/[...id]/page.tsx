import ProviderDetails from '@/components/sections/providers/ProviderDetails';

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const paramsId = id[0];

  return (
    <div>
      <ProviderDetails paramsId={paramsId} />
    </div>
  );
};

export default page;
