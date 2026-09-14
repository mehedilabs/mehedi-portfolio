import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-gray-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold">Mehedi.</h2>

          <p className="mt-2 max-w-md text-sm text-gray-400">
            Full-stack developer building useful, simple and thoughtful
            digital products.
          </p>
        </div>

        <div className="flex gap-4">
          <a href="#" aria-label="GitHub">
            <FiGithub size={20} />
          </a>

          <a href="#" aria-label="LinkedIn">
            <FiLinkedin size={20} />
          </a>

          <a href="#" aria-label="Email">
            <FiMail size={20} />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        © 2026 Mehedi Hasan. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;