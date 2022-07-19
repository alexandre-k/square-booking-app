import Avatar from "@mui/material/Avatar";

interface UserAvatarProps {
  letters: string;
  sizePx: number;
}

const UserAvatar = ({ letters, sizePx }: UserAvatarProps) => (
    <Avatar
      sx={{ width: sizePx, height: sizePx }}
      src={`https://ui-avatars.com/api/?name=${letters}`}
    />
);

UserAvatar.defaultProps = {
    sizePx: 56
}

export default UserAvatar;
