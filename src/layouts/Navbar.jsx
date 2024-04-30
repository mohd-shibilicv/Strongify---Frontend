import { LoginButton } from "@/components/appComponents/LoginButton";
import { ModeToggle } from "@/components/appComponents/ModeToggle";
import { Button } from "@/components/ui/button";
import { LockKeyhole, LogOut } from "lucide-react";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authSlice from "@/store/slices/auth";
import { toast } from "@/components/ui/use-toast";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = !!auth.account;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    toast({
      title: <p className="text-md">Successfully logged out!</p>,
      className: "bg-black text-red-500 rounded-xl shadow-lg",
    });
    navigate("/");
  };

  return (
    <div>
      <div className="flex mx-auto justify-between dark:text-white">
        <Link to="/" className="flex gap-2 items-center">
          <LockKeyhole />
          <p className="text-2xl font-semibold">Strongify</p>
        </Link>
        <div className="flex gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/passwords">
                <Button className="border border-black dark:border-white rounded px-10">
                  Passwords
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="border border-black dark:border-white hover:border-red-500 dark:hover:border-red-500 rounded px-2">
                    <LogOut className="text-black dark:text-white hover:text-red-500 dark:hover:text-red-500" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="text-black bg-white dark:bg-black dark:text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will log you out.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="text-red-500"
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <LoginButton />
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
