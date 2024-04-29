import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const NavigateComponent = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
        variant: "destructive",
        description: "Authentication is required to access the page."
    });
  }, [toast]);

  return <Navigate to="/" replace />;
};

export default NavigateComponent;
