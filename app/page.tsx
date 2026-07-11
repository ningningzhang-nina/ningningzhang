const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function RootPage() {
  const zhPath = `${basePath}/zh/`;

  return (
    <main className="min-h-screen bg-[#c8d2c2] px-8 py-12 text-[#382638]">
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(zhPath)});`,
        }}
      />
      <p className="text-[15px]">
        <a className="underline underline-offset-2" href={zhPath}>
          进入首页
        </a>
      </p>
    </main>
  );
}
