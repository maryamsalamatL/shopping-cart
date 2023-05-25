import { useAuth } from "../../provider/AuthProvider";

const UserProfilePage = () => {
  const userData = useAuth();
  return (
    <div>
      <p>{userData.name}</p>
      <p>{userData.email}</p>
    </div>
  );
};

export default UserProfilePage;
