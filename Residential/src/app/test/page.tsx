export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">Test Page</h1>
        <p className="text-gray-600">If you can see this, the frontend is working!</p>
        <div className="mt-4">
          <a 
            href="/" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Main Site
          </a>
        </div>
      </div>
    </div>
  );
}
