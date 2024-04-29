import React from "react";

const Error404Page = () => {
  return (
    <div className="relative flex items-top justify-center min-h-screen dark:bg-black sm:items-center sm:pt-0">
      <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
          <div className="px-4 text-xl text-black dark:text-white border-r border-black dark:border-white tracking-wider">
            404
          </div>
          <div className="ml-4 text-xl text-black dark:text-white uppercase tracking-wider">
            Not Found
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404Page;