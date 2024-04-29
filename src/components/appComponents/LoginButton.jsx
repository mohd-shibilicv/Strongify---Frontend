import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignupButton } from "./SignupButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import authSlice from "@/store/slices/auth";

export function LoginButton() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!password || !email) {
      setError("Enter your valid credentials...");
      setLoading(false);
      return;
    }
    setError("");

    const data = {
      email: email,
      password: password,
    };
    const url = "http://127.0.0.1:8000/api/login/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (response.status !== 200) {
      const data = await response.json();
      setError(data.detail);
      setLoading(false);
    } else {
      setLoading(false);
      const data = await response.json();
      dispatch(authSlice.actions.setAccount(data.user));
      dispatch(
        authSlice.actions.setAuthTokens({
          token: data.access,
          refreshToken: data.refresh,
        })
      );
      toast({
        title: (
          <p className="text-green-500 text-md">Successfully logged in!</p>
        ),
      });
      navigate("/");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border border-black dark:border-white rounded px-10">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-black dark:text-white">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {error && (
              <p className="p-2 w-full bg-red-100 text-red-600 text-center">
                {error}
              </p>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                className="col-span-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                className="col-span-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <SignupButton />
            <DialogFooter>
              <Button type="submit">
                {loading ? (
                  <div
                    className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-yellow-1000 rounded-full"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
