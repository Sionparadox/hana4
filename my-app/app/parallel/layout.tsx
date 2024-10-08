export default function ParallelLayout({
  children,
  login,
  profile,
}: {
  children: React.ReactNode;
  login: React.ReactNode;
  profile: React.ReactNode;
}) {
  return (
    <>
      <h1 className='text-2xl'>Parallel Layout</h1>
      <div className='flex justify-between gap-3 border p-5'>
        <div className='bg-purple-200'>{login}</div>
        <div className='bg-slate-200'>{profile}</div>
      </div>
      <hr />
      {children}
    </>
  );
}
