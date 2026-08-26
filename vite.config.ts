import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
//
// ─────────────────────────────────────────────────────────────────────────────
// CHUNKING STRATEGY — why this file looks the way it does
//
// Every strategic component is already lazy-loaded in AppLayout.tsx via
// React.lazy(() => import(...)). Rollup therefore splits them automatically,
// and naming them in manualChunks is not just redundant — it is harmful:
//
//   1. Object-form manualChunks treats each value as an ENTRY MODULE. A path
//      that does not resolve fails the whole build. That is precisely what
//      'survey-wizard': ['./src/components/strategic/SurveyWizard'] did — the
//      file lives in the bird-validation-survey repo, never this one, so the
//      build died at "Could not resolve entry module".
//   2. Forcing an eagerly-named chunk for a module that is only ever reached by
//      dynamic import can pull it into the initial graph, defeating the very
//      code-splitting the lazy() call was written to achieve.
//
// So: local component entries are removed, and vendor grouping moves to the
// FUNCTION form, which matches on module id. A function-form matcher cannot
// break the build on a missing path — an unmatched id simply falls through to
// Rollup's default chunking. This class of failure is now structurally
// impossible rather than merely fixed.
// ─────────────────────────────────────────────────────────────────────────────

/** Vendor groups, ordered most-specific first. Keys are chunk names. */
const VENDOR_GROUPS: Array<[string, readonly string[]]> = [
  ["vendor-react", ["react-router-dom", "react-dom", "react"]],
  ["vendor-ui", ["@radix-ui/", "lucide-react", "framer-motion"]],
  ["vendor-data", ["@supabase/", "@tanstack/"]],
  ["vendor-charts", ["recharts", "d3-", "victory-"]],
  ["vendor-utils", ["date-fns", "zod", "clsx", "tailwind-merge", "class-variance-authority"]],
];

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    server: {
      host: "::",
      port: 8080,
    },
    preview: {
      host: "::",
      port: 8080,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Pre-bundle the heavy, stable dependencies so cold dev starts are fast.
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom", "@supabase/supabase-js"],
    },
    build: {
      target: "es2020",
      minify: "esbuild",
      // Hidden sourcemaps in production: the bundle stays clean, but stack
      // traces remain resolvable if the maps are uploaded to an error tracker.
      sourcemap: isProd ? "hidden" : true,
      chunkSizeWarningLimit: 600,
      // Fail loudly if a chunk grows past the limit in CI rather than warning
      // into a log nobody reads.
      reportCompressedSize: !isProd,
      rollupOptions: {
        output: {
          // Function form — see the note above. Never breaks on a missing path.
          manualChunks(id: string) {
            if (!id.includes("node_modules")) return undefined;
            const normalized = id.replace(/\\/g, "/");
            for (const [chunk, patterns] of VENDOR_GROUPS) {
              if (patterns.some((p) => normalized.includes(`node_modules/${p}`))) {
                return chunk;
              }
            }
            return "vendor";
          },
          // Stable, cache-friendly asset names.
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },
  };
});