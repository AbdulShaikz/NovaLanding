import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold">
            N
          </div>
          <div>
            <div className="font-semibold">NovaLanding</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Modern landing templates for startups
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-4" aria-label="Social links">
          <a
            href="#"
            aria-label="Facebook"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Facebook />
          </a>
          <a
            href="https://x.com/@starabdul100"
            aria-label="Twitter"
            target="_blank"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Twitter />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Linkedin />
          </a>
        </nav>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} NovaLanding. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
