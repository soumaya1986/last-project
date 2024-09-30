function NotFound() {
  return (
    <div className="my-8 mx-auto max-w-screen-lg px-4 md:px-8">
    <div className="grid gap-8 sm:grid-cols-2">
      
        <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
            <h1 className="text-4xl font-bold text-pink-600 mb-5">404 - Page Not Found</h1>
            <p className="text-gray-txt mb-5">You are not authorized
            </p>
            <p className="text-gray-txt mb-5">
            You tried to access a page you did not have prior authorization for.
            </p>
        </div>
      
        <div className="relative h-50 overflow-hidden rounded-lg bg-white-50 shadow-lg md:h-auto">
            <img src="https://previews.123rf.com/images/kaymosk/kaymosk1804/kaymosk180400005/99776312-error-404-page-not-found-error-with-glitch-effect-on-screen-vector-illustration-for-your-design.jpg" alt="Image" className="w-full h-auto" />
        </div>
  
    </div>
</div>
  );
}

export default NotFound;
