import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-sky-50 w-1/2 px-12">
      <div class="relative h-50 overflow-hidden rounded-lg bg-white-50 shadow-lg md:h-auto">
            <img src="https://cedcommerce.com/blog/wp-content/uploads/2018/12/designers-working-internet-store-website_1262-19238.jpg" alt="Image" class="w-full h-auto" />
        </div>
       
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
