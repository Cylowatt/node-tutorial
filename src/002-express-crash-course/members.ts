export enum MemberStatus {
  active = 'active',
  inactive = 'inactive'
}

export interface Member {
  id: number;
  name: string;
  email: string;
  status: MemberStatus;
}

export const members: Member[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@_.com',
    status: MemberStatus.active
  },
  {
    id: 2,
    name: 'Bob Williams',
    email: 'bob@_.com',
    status: MemberStatus.inactive
  },
  {
    id: 3,
    name: 'Shannon Jackson',
    email: 'shannon@_.com',
    status: MemberStatus.active
  }
];
