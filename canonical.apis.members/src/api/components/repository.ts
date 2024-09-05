import { MemberModel, IMember, IMemberSearch } from './model';

export async function getMember(provider, gmpi) : Promise<IMember> {
    return MemberModel.findOne( { provider: provider, gmpi: gmpi});
}

export async function  searchGMPI(provider: String, gmpi: String ) : Promise<IMember[]> {
    return MemberModel.find( { provider: provider, gmpi: gmpi });
}

export async function  searchMemberId(provider: String, memberId: String ) : Promise<IMember[]> {
    return MemberModel.find( { provider: provider, memberId: memberId});
}

export async function searchExtended(provider: String, lastName: String, firstName: String, dob: Date) : Promise<IMember[]> {
    return MemberModel.find( { provider: provider, lastName: lastName, firstName: firstName, dateOfBirth: dob});
}