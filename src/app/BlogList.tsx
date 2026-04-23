import { useEffect, useState } from "react";

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  link: string;
}

function BlogList() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // WordPress API URL - Fixed format
  const WORDPRESS_URL = "https://saperepublication.com/wp";
  const API_ENDPOINT = `${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=10&_embed`;

  // CORS Proxy Options (fallback)
  const CORS_PROXIES = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(API_ENDPOINT)}`,
    `https://corsproxy.io/?${encodeURIComponent(API_ENDPOINT)}`,
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("🔄 Attempting to fetch from:", API_ENDPOINT);

        // Try direct fetch first
        try {
          const response = await fetch(API_ENDPOINT, {
            method: "GET",
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
              Accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data: WordPressPost[] = await response.json();
          console.log("✅ Posts fetched successfully (Direct):", data);
          setPosts(data);
          setError(null);
          return;
        } catch (directError) {
          console.warn("⚠️ Direct fetch failed, trying CORS proxy...", directError);

          // If direct fetch fails, try CORS proxy
          for (let i = 0; i < CORS_PROXIES.length; i++) {
            try {
              console.log(`🔄 Trying CORS proxy ${i + 1}...`);
              const response = await fetch(CORS_PROXIES[i], {
                method: "GET",
                headers: {
                  Accept: "application/json",
                },
              });

              if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
              }

              const data: WordPressPost[] = await response.json();
              console.log(`✅ Posts fetched successfully (CORS Proxy ${i + 1}):`, data);
              setPosts(data);
              setError(null);
              return;
            } catch (proxyError) {
              console.warn(`❌ CORS Proxy ${i + 1} failed:`, proxyError);
              if (i === CORS_PROXIES.length - 1) {
                throw proxyError;
              }
            }
          }
        }
      } catch (err: any) {
        console.error("❌ Complete error details:", {
          message: err.message,
          name: err.name,
          stack: err.stack,
        });

        const errorMessage = err.message || "Failed to fetch posts";
        setError(errorMessage);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-4">
            <div className="animate-spin">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            ⏳ Loading Posts...
          </h2>
          <p className="text-center text-gray-600">Please wait while we fetch your blog posts</p>
          <p className="text-center text-sm text-gray-500 mt-4">
            Check console (F12) for detailed logs
          </p>
        </div>
      </div>
    );
  }

  // ✅ ERROR STATE
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-4">
            <div className="text-5xl">❌</div>
          </div>
          <h2 className="text-2xl font-bold text-center text-red-800 mb-2">Oops! Error Occurred</h2>
          <p className="text-center text-gray-700 mb-4">{error}</p>

          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <p className="text-sm text-red-700 font-semibold mb-2">Troubleshooting Steps:</p>
            <ul className="text-sm text-red-600 space-y-1">
              <li>✓ Check if WordPress site is accessible</li>
              <li>✓ Verify the correct WordPress URL</li>
              <li>✓ Check browser console (F12) for CORS errors</li>
              <li>✓ Ensure REST API is enabled in WordPress</li>
            </ul>
          </div>

          <button
            onClick={handleRetry}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold mb-3"
          >
            🔄 Try Again
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
          >
            🔁 Reload Page
          </button>

          <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-700 font-mono">
            <p className="font-bold mb-1">WordPress API URL:</p>
            <p className="break-all">{API_ENDPOINT}</p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ EMPTY STATE
  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100 p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-4">
            <div className="text-5xl">📭</div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">No Posts Found</h2>
          <p className="text-center text-gray-600 mb-4">
            The website doesn't have any published posts yet
          </p>

          <button
            onClick={handleRetry}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    );
  }

  // ✅ SUCCESS STATE - Display posts
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">📚 Blog Posts</h1>
          <p className="text-lg text-gray-600">
            Total posts: <span className="font-semibold text-blue-600">{posts.length}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            From: <span className="font-mono text-gray-700">{WORDPRESS_URL}</span>
          </p>
        </div>

        {/* Posts Grid */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-blue-500 hover:border-blue-600"
            >
              <div className="p-6">
                {/* Post Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                    Post #{index + 1}
                  </span>
                  {post.date && (
                    <span className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    className="hover:underline"
                  />
                </h2>

                {/* Excerpt */}
                {post.excerpt.rendered && (
                  <div
                    className="text-gray-700 leading-relaxed text-base"
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.rendered,
                    }}
                  />
                )}

                {/* Read More Link */}
                {post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Read More →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md text-center">
          <p className="text-gray-600">
            Successfully loaded <span className="font-bold text-blue-600">{posts.length}</span> posts
          </p>
          <button
            onClick={handleRetry}
            className="mt-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            🔄 Refresh Posts
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogList;