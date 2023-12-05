export default function Footer({
  backgroundColor = "bg-transparent",
}: {
  backgroundColor?: string;
}) {
  return (
    <footer>
      <div
        className={`mx-auto w-full p-4 py-2 lg:py-4 max-[640px]:px-4 ${backgroundColor}`}
      >
        <div className="flex flex-row justify-between gap-8 mb-1">
          <ul className="flex flex-row gap-8 font-medium text-gray-600">
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                Terms &amp; Conditions
              </a>
            </li>
          </ul>
        </div>

        <hr className="mb-2 border-gray-200 sm:mx-auto " />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © {new Date().getFullYear()}{" "}
            <a href="/" className="hover:underline">
              remix-saas™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
