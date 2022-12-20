import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter();

  const [authResult, setAuthResult] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password, remember }, event) => {
    event.preventDefault();
    console.log("test");
    const loginResults = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    // setAuthResult(loginResults);
    // if (loginResults.ok) {
    //   await router.push(`/${router.query.origin}`);
    // }
  };

  const onSignInWithGoogle = async (e) => {
    e.preventDefault();
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: "/classroom",
    });
    if (result?.ok) {
      await router.push(`/${router.query.origin}`);
    }
  };

  return (
    <div className="flex justify-center  bg-gray-100 ">
      <div className="w-full overflow-hidden bg-white shadow-lg sm:rounded-lg sm:flex  sm:max-w-7xl ">
        <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="w-full max-w-sm mx-auto lg:w-96">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-800 ">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{" "}
                <Link href="/register">
                  <a className="font-medium text-blue-600 hover:text-blue-500">
                    create a new account
                  </a>
                </Link>
              </p>
            </div>
            <div className="mt-8">
              <div>
                <div>
                  <div className="flex justify-center ">
                    <div>
                      <button
                        onClick={(e) => onSignInWithGoogle(e)}
                        aria-label="Continue with google"
                        role="button"
                        className=" hover:border-gray-300  py-3.5 px-4 border rounded-lg border-gray-200 flex items-center w-full "
                      >
                        <svg
                          width={19}
                          height={20}
                          viewBox="0 0 19 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                            fill="#4285F4"
                          />
                          <path
                            d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                            fill="#34A853"
                          />
                          <path
                            d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                            fill="#EB4335"
                          />
                        </svg>
                        <p className="ml-4 text-sm font-medium text-gray-600">
                          Continue with Google
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500 bg-white">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register("email")}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register("password")}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        {...register("remember")}
                      />
                      <label
                        htmlFor="remember-me"
                        className="block ml-2 text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Sign in
                    </button>
                  </div>
                  {authResult && (
                    <div className="font-semibold text-center text-red-500 ">
                      {authResult.status === 401
                        ? "Invalid username or password"
                        : null}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block ">
          <img
            className="h-full"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

// Login.getLayout = function getLayout(page) {
//   return <AppLayoutOneColumn>{page}</AppLayoutOneColumn>;
// };
