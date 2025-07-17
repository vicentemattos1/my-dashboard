export default function Home() {
  const message = 'Hello World';
  const greeting = 'Welcome to my dashboard';
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-4xl font-bold">{message}</h1>
      <p className="text-xl text-gray-600">{greeting}</p>
    </div>
  );
}
