import { IUser } from '../user/user.dto'
import { IGroup } from './group.dto'
import groupSchema from './group.schema'

export const createGroup = async (data: IGroup, adminId: string) => {
  const groupData = {
    ...data,
    admin: adminId,
    members: [adminId],
    pendingInvites: [],
  }
  const result = await groupSchema.create(groupData)
  return result
}

export const getAllGroup = async () => {
  const result = await groupSchema.find({}).lean()
  return result
}

export const getGroupById = async (id: string) => {
  console.log(id)
  const result = await groupSchema.findById(id).lean()
  return result
}

export const deleteGroup = async (id: string) => {
  const result = await groupSchema.deleteOne({ _id: id })
  return result
}

export const checkGroupAdmin = async (id: string, groupId: string) => {
  const result = await groupSchema.findOne({ _id: groupId, admin: id })
  return result
}

export const updateGroup = async (id: string, data: IGroup) => {
  await groupSchema.findOneAndUpdate({ _id: id }, data)
  const result = await getGroupById(id)
  return result
}

export const addMembers = async (
  groupId: string,
  adminId: string,
  memberId: string,
) => {
  if (!memberId) {
    throw new Error('User ID is required.')
  }

  const group = await groupSchema.findById(groupId)

  if (!group) {
    throw new Error('Group not found.')
  }

  if (!group.admin.includes(adminId)) {
    throw new Error('Only admins can add members.')
  }

  const updatedMembers = [...new Set([...group.members, memberId])]

  group.members = updatedMembers
  await group.save()

  return group
}

export const removeAdmin = async (groupId: string, adminId: string) => {
  const group = await groupSchema.findById(groupId)

  if (!group) {
    throw new Error('Group not found.')
  }

  if (!group.admin.includes(adminId)) {
    throw new Error('Only admins can remove admins.')
  }

  await group.save()
  return group
}

export const removeMember = async (
  groupId: string,
  adminId: string,
  memberId: string,
) => {
  const group = await groupSchema.findById(groupId)

  if (!group) {
    throw new Error('Group not found.')
  }

  if (!group.admin.includes(adminId)) {
    throw new Error('Only admins can remove members.')
  }

  group.members = group.members.filter((member: string) => member !== memberId)
  await group.save()

  return group
}

export const makeAdmin = async (
  groupId: string,
  adminId: string,
  memberId: string,
) => {
  const group = await groupSchema.findById(groupId)

  if (!group) {
    throw new Error('Group not found.')
  }

  if (!group.admin.includes(adminId)) {
    throw new Error('Only admins can make admins.')
  }

  await group.save()

  return group
}

export const joinGroup = async (groupId: string, memberId: string) => {
  const group = await groupSchema.findById(groupId)

  if (!group) {
    throw new Error('Group not found.')
  }

  if (group.members.includes(memberId)) {
    throw new Error('User is already a member of the group.')
  }

  group.members.push(memberId)
  await group.save()
  return group
}

export const getJoinedGroups = async (userId: string) => {
  const groups = await groupSchema.find({ members: userId })
  return groups;
}

export const requestToJoinGroup = async (groupId: string, userId: string) => {
  const group = await groupSchema.findById(groupId)
  if (!group) throw new Error('Group not found')

  if (group.members.includes(userId)) throw new Error('Already a member')

  if (group.privacy === 'PUBLIC') {
    group.members.push(userId)
    await group.save()
    return { message: 'Joined group successfully' }
  }

  if (group.pendingInvites.includes(userId))
    throw new Error('Already requested')

  group.pendingInvites.push(userId)
  await group.save()
  return { message: 'Request sent to admin' }
}

export const approveJoinRequest = async (
  groupId: string,
  adminId: string,
  userId: string,
) => {
  const group = await groupSchema.findById(groupId)
  if (!group) throw new Error('Group not found')

  if (group.admin.toString() !== adminId)
    throw new Error('Only admin can approve requests')

  if (!group.pendingInvites.includes(userId))
    throw new Error('No request found')

  group.members.push(userId)
  group.pendingInvites = group.pendingInvites.filter(
    (_id) => _id.toString() !== userId,
  )
  await group.save()
  return { message: 'User added to group' }
}

export const declineJoinRequest = async (
  groupId: string,
  adminId: string,
  userId: string,
) => {
  const group = await groupSchema.findById(groupId)
  if (!group) throw new Error('Group not found')

  if (group.admin.toString() !== adminId)
    throw new Error('Only admin can decline requests')
  if (!group.pendingInvites.includes(userId))
    throw new Error('No request found')
  group.pendingInvites = group.pendingInvites.filter(
    (id) => id.toString() !== userId,
  )
  await group.save()
  return { message: 'Request declined' }
}

export const getPendingJoinRequests = async (adminId: string) => {
  const groups = await groupSchema
    .find({ admin: adminId })
    .populate('pendingInvites', 'name _id')

  if (!groups || groups.length === 0) {
    throw new Error('No groups found where you are the admin')
  }

  const pendingApprovals = groups.flatMap((group) =>
    group.pendingInvites.map((user: any) => ({
      _id: user?._id,
      name: user?.name,
      groupName: group.name,
      groupId: group._id,
    })),
  )

  return pendingApprovals
}
