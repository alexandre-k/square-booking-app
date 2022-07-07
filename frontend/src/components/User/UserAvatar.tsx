import Avatar from "@mui/material/Avatar";

interface UserAvatarProps {
  letters: string;
}

const UserAvatar = ({ letters }: UserAvatarProps) => (
    <Avatar
      sx={{ width: 56, height: 56 }}
      src={`https://ui-avatars.com/api/?name=${letters}.jpg`}
    />
);

export default UserAvatar;
