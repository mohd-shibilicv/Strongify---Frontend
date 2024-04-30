import PasswordGenerationForm from "@/components/appComponents/PasswordGenerationForm";
import React from "react";
import { useSelector } from "react-redux";

const PasswordGenerationPage = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <div className="w-full mt-10 flex justify-center items-center">
        <PasswordGenerationForm />
      </div>
    </>
  );
};

export default PasswordGenerationPage;
