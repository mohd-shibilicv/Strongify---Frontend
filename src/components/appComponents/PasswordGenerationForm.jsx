import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Check, Copy } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PasswordGenerationForm() {
  const userId = useSelector((state) => state.auth?.account?.id);
  const isAuthenticated = useSelector((state) => state.auth?.account);
  const token = useSelector((state) => state.auth?.token);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    passwordLength: "12",
    includeNumbers: false,
    includeLowercase: true,
    includeUppercase: false,
    includeSymbols: false,
  });
  const navigate = useNavigate();

  const generatePassword = () => {
    const {
      passwordLength,
      includeNumbers,
      includeLowercase,
      includeUppercase,
      includeSymbols,
    } = formValues;
    let characters = "";
    let password = "";

    if (!formValues.title.trim()) {
      setError("Title is required!");
      setGeneratedPassword("");
      return;
    } else if (
      !includeNumbers &
      !includeLowercase &
      !includeUppercase &
      !includeSymbols
    ) {
      setError("You must select at least one character set!");
      setGeneratedPassword("");
      return;
    }

    if (includeNumbers) {
      characters += "0123456789";
    }
    if (includeLowercase) {
      characters += "abcdefghijklmnopqrstuvwxyz";
    }
    if (includeUppercase) {
      characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (includeSymbols) {
      characters += "!#$%&*+-.:?@";
    }

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    setGeneratedPassword(password);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedPassword)
      .then(() => {
        setCopySuccess(true);
        toast({
          title: (
            <p className="text-white text-md flex gap-2 items-center">
              <Check />
              Copied to clipboard!
            </p>
          ),
          className: "bg-black rounded-lg shadow-lg",
        });
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  const handlePasswordSave = async (e) => {
    setLoading(true);

    const data = {
      user_id: userId,
      title: formValues.title,
      notes: formValues.notes,
      password: generatedPassword,
    };
    const url = "https://api-strongify.up.railway.app/api/passwords/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (response.status !== 201 && response.status !== 200) {
        const data = await response.json();
        setLoading(false);
        toast({
          title: <p className="text-red-500 text-lg">Error</p>,
          description: (
            <pre className="mt-2 w-[340px] rounded-md text-white p-4">
              <code className="text-red-500 text-wrap">
                {data.non_field_errors
                  ? `${data.non_field_errors[0]}`
                  : "An error occurred while saving the password."}
              </code>
            </pre>
          ),
        });
      } else {
        setLoading(false);
        const data = await response.json();
        toast({
          title: <p className="text-md">Password saved!</p>,
          className: "bg-black text-green-500 rounded-lg shadow-lg",
        });
        navigate("/passwords");
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: (
          <p className="text-md">
            An error occurred while saving the password.
          </p>
        ),
        className: "bg-black text-red-500 rounded-lg shadow-lg",
      });
    }
  };

  return (
    <>
      <Card className="w-[500px] border border-black dark:border-white">
        <CardHeader className="text-black dark:text-white">
          <CardTitle>Password Generator</CardTitle>
          <CardDescription>
            Generate a secure random password in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-black dark:text-white">
          <form>
            <div className="grid w-full gap-4">
              {error && (
                <p className="p-2 bg-red-100 text-red-600 rounded">{error}</p>
              )}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title*</Label>
                <Input
                  id="title"
                  name="title"
                  value={formValues.title}
                  onChange={handleInputChange}
                  placeholder="Title for the password"
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formValues.notes}
                  onChange={handleInputChange}
                  placeholder="Type your notes here..."
                />
                <p className="text-xs text-muted-foreground">
                  Your notes will help you recall the purpose of the password.
                </p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="passwordLength">Password Length</Label>
                <Select
                  onValueChange={(value) => {
                    setFormValues({ ...formValues, passwordLength: value });
                  }}
                  value={formValues.passwordLength}
                >
                  <SelectTrigger id="passwordLength">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="bg-black text-white"
                  >
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="16">16</SelectItem>
                    <SelectItem value="32">32</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="items-top flex space-x-2 mt-2">
                <Checkbox
                  id="includeNumbers"
                  name="includeNumbers"
                  checked={formValues.includeNumbers}
                  onCheckedChange={(checked) => {
                    setFormValues({ ...formValues, includeNumbers: checked });
                  }}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="includeNumbers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Numbers (e.g. 123456)
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="includeLowercase"
                  name="includeLowercase"
                  checked={formValues.includeLowercase}
                  onCheckedChange={(checked) => {
                    setFormValues({ ...formValues, includeLowercase: checked });
                  }}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="includeLowercase"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Lowercase Characters (e.g. abcdefgh)
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="includeUppercase"
                  name="includeUppercase"
                  checked={formValues.includeUppercase}
                  onCheckedChange={(checked) => {
                    setFormValues({ ...formValues, includeUppercase: checked });
                  }}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="includeUppercase"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Uppercase Characters (e.g. ABCDEFGH)
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="includeSymbols"
                  name="includeSymbols"
                  checked={formValues.includeSymbols}
                  onCheckedChange={(checked) => {
                    setFormValues({ ...formValues, includeSymbols: checked });
                  }}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="includeSymbols"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Symbols (e.g. !#$%&*+-.:?@)
                  </label>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <Dialog>
          <CardFooter className="flex justify-between">
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full bg-black text-white hover:bg-white hover:border-black dark:hover:text-white dark:hover:bg-black dark:bg-white dark:text-black border dark:border-white rounded"
                onClick={generatePassword}
              >
                Generate Password
              </Button>
            </DialogTrigger>
            {generatedPassword && formValues.title && (
              <DialogContent className="sm:max-w-md text-black dark:text-white bg-white dark:bg-black">
                <DialogHeader>
                  <DialogTitle>Generated Password</DialogTitle>
                  <DialogDescription>
                    Don't forget to save the password for later use.
                  </DialogDescription>
                </DialogHeader>
                <h3 className="text-lg font-semibold text-center">
                  {formValues.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="link"
                      defaultValue={generatedPassword}
                      readOnly
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="px-3"
                    onClick={copyToClipboard}
                  >
                    <span className="sr-only">Copy</span>
                    {copySuccess ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <DialogFooter className="sm:justify-between">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  {isAuthenticated ? (
                    <Button
                      type="button"
                      className="border border-black dark:hover:border-white dark:bg-white dark:hover:bg-black rounded dark:text-black hover:text-black dark:hover:text-white"
                      onClick={handlePasswordSave}
                    >
                      {loading ? (
                        <div
                          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-yellow-1000 rounded-full"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Save Password"
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="border border-black dark:bg-white rounded dark:text-black hover:text-black"
                    >
                      Login to Save your Password
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            )}
          </CardFooter>
        </Dialog>
      </Card>
    </>
  );
}
