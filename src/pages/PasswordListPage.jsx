import PasswordDataTable from "@/components/appComponents/PasswordList";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PasswordListPage = () => {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    const fetchStoredPasswords = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/passwords/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setData(data.results);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchStoredPasswords();
  }, []);

  return (
    <>
      {data ? (
        <div className="w-full mt-10 flex justify-center items-center">
          <PasswordDataTable passwords={data} />
        </div>
      ) : (
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-yellow-1000 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
};

export default PasswordListPage;
