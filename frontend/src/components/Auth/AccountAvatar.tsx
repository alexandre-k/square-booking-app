import { MagicUserMetadata } from "magic-sdk";
import UserAvatar from "components/User/UserAvatar";

interface AccountAvatarProps {
    user: MagicUserMetadata
}

const AccountAvatar = ({ user }: AccountAvatarProps) => (
    <UserAvatar letters={!!user.email ? user.email.slice(0, 1) : "aa" } sizePx={46} />
)

export default AccountAvatar
