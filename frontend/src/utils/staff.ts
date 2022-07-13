import { TeamMember } from "types/Team";

export const anyMember = () => ({
    id: "anyStaffMember",
    givenName: "Anyone",
    familyName: "",
    isOwner: false,
    status: "ACTIVE",
    emailAddress: "",
    phoneNumber: "",
    createdAt: "",
    updatedAt: "",
    avatarUrl: ""
});

export const getInitials = (member: TeamMember) => {
    return (member.id === "anyStaffMember") ? "?" : `${member.givenName}+${member.familyName}.jpg`;
}
