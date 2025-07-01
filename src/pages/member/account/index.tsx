import DashboardLayout from "@/components/DashboardLayout";
import authServices from "@/services/auth.service";
import useGetProfile from "@/utils/useGetProfile";
import { Button, Card, CardBody, Divider, Input, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CiMail, CiUser } from "react-icons/ci";

const Account = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading]=useState(true);

  const { dataProfile } = useGetProfile();

  useEffect(() => {
    if (dataProfile) {
      setFullName(dataProfile.fullName || "");
      setEmail(dataProfile.email || "");
      setLoading(false);
    }
  }, [dataProfile]);

  const [errors, setErrors] = useState<any>({});

  const handleUpdate = async (field: string) => {
    setErrors({}); // Reset errors

    const payload: Record<string, any> = {};
    if (field === "fullName") payload.fullName = fullName;
    if (field === "email") payload.email = email;
    if (field === "password") {
      payload.password = password;
      payload.confirmPassword = confirmPassword;
    }

    try {
      await authServices.update(payload);
      // alert(`${field} updated successfully`);
      setErrors({});
      if (field === "password") {
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error: any) {
      const fieldErrors = error?.response?.data?.errors;
      const message = error?.response?.data?.message;

      if (fieldErrors) {
        setErrors((prev: any) => ({ ...prev, ...fieldErrors }));
      } else {
        // fallback generic error
        setErrors((prev: any) => ({ ...prev, [field]: message || "Update failed" }));
      }
    }
  };

  return (
    <DashboardLayout title="Account" type="member">
      {!loading && dataProfile ? (
        <Card className="flex flex-col w-fit items-end" radius="sm" shadow="sm">
          <CardBody className="flex flex-col w-fit items-end gap-y-4">
            <Input
              type="text" variant="bordered" autoComplete="off" radius="sm" label="Full name" labelPlacement="outside"
              value={fullName} onValueChange={setFullName}
              isInvalid={!!errors.fullName} errorMessage={errors.fullName}
              startContent={<CiUser size={24}/>}
              className="w-[360px] md:w-[400px] mb-4"
              />
            <Button className="w-36 mb-10" radius="sm" color="primary" variant="ghost" onClick={() => handleUpdate("fullName")}>Update Name</Button>
            <Divider></Divider>
            <Input
              type="email" variant="bordered" autoComplete="off" radius="sm" label="Email" labelPlacement="outside"
              value={email} onValueChange={setEmail}
              isInvalid={!!errors.email} errorMessage={errors.email}
              startContent={<CiMail size={24}/>}
              className="w-[360px] md:w-[400px] mb-4"
            />
            <Button className="w-36 mb-10" radius="sm" color="primary" variant="ghost" onClick={() => handleUpdate("email")}>Update Email</Button>
            <Divider></Divider>
            <div className="flex gap-x-4 w-[360px] md:w-[400px] justify-between items-start">
              <Input
                type="password" variant="bordered" autoComplete="off" radius="sm" label="Password" labelPlacement="outside" placeholder="Enter your password"
                value={password} onValueChange={setPassword}
                isInvalid={!!errors.password} errorMessage={errors.password}
                className="w-full"
                description=""
                />
              <Input
                type="password" variant="bordered" autoComplete="off" radius="sm" label="Confirm Password" labelPlacement="outside" placeholder="Confirm your password"
                value={confirmPassword} onValueChange={setConfirmPassword}
                isInvalid={!!errors.confirmPassword} errorMessage={errors.confirmPassword}
                className="w-full"
                />
            </div>
            <span className="text-xs text-gray-500 w-[360px] md:w-[400px] -mt-2 mb-4">
              Min. 8 characters with at least one uppercase, one lowercase, one number, and one special character.
            </span>
            <Button className="w-36 mb-10" radius="sm" color="primary" variant="ghost" onClick={() => handleUpdate("password")}>Update Password</Button>
            </CardBody>
        </Card>
      ):(
        <Card className="flex flex-col w-fit items-end" radius="sm" shadow="sm">
          <CardBody className="flex flex-col w-fit items-end gap-y-4">
            <Skeleton className="w-[360px] md:w-[400px] mb-4 h-8 rounded-md"></Skeleton>
            <Skeleton className="w-36 mb-10 h-8 rounded-md"></Skeleton>
            <Divider></Divider>
            <Skeleton className="w-[360px] md:w-[400px] mb-4 h-8 rounded-md"></Skeleton>
            <Skeleton className="w-36 mb-10 h-8 rounded-md"></Skeleton>
            <Divider></Divider>
            <div className="flex gap-x-4 w-[360px] md:w-[400px] justify-between items-start">
              <Skeleton className="w-1/2 mb-4 h-8 rounded-md"></Skeleton>
              <Skeleton className="w-1/2 mb-4 h-8 rounded-md"></Skeleton>
            </div>
            <Skeleton className="w-36 mb-10 h-8 rounded-md"></Skeleton>
          </CardBody>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default Account;
