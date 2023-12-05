import VerifyEmailSvg from "~/components/svg/VerifyEmailSvg";

export default function () {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 max-[639px]:w-[95%]">
        <div className="bg-white w-[30rem] rounded-2xl shadow-[rgba(149,157,165,0.2)_0px_8px_24px] p-5 max-[639px]:w-[100%]">
          <p className="pb-10 text-2xl font-bold text-center opacity-80">
            Verify your email
          </p>

          <VerifyEmailSvg />
          <div className="border-b ">
            <p className="pt-10 pb-4 text-xl text-center font-noraml opacity-60">
              {" "}
              We've sent you an email with instructions for verifying your
              email.
            </p>
          </div>
          <div className="pt-4">
            <p className="pb-4 text-xl text-center font-noraml opacity-60">
              {" "}
              Please check your
              <span className="font-bold"> spam folder </span>
              if you don't see it in your inbox.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
