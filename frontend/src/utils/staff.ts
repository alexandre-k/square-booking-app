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


export const getTeamMemberId = (selectedMemberIds: Array<string>) => {
    if (selectedMemberIds.length === 0) return "";
    // TODO: get real team member id
    if (selectedMemberIds[0] === "anyStaffMember") {
        return "anyStaffMember";
    }
    return selectedMemberIds[0];
};

