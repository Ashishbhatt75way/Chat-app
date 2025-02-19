
import groupSchema from '../group/group.schema';
import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";
import {Message} from "../message/message.schema";

export const createUser = async (data: IUser) => {
    const result = await UserSchema.create({ ...data, active: true });
    return result.toObject();
};

export const updateUser = async (id: string, data: IUser) => {
    const result = await UserSchema.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

export const editUser = async (id: string, data: Partial<IUser>) => {
    const result = await UserSchema.findOneAndUpdate({ _id: id }, data);
    return result;
};

export const deleteUser = async (id: string) => {
    const result = await UserSchema.deleteOne({ _id: id });
    return result;
};

export const getUserById = async (id: string) => {
    const result = await UserSchema.findById(id).lean();
    return result;
};

export const getAllUser = async () => {
    const result = await UserSchema.find({}).lean();
    return result;
};
export const getUserByEmail = async (email: string, withPassword = false) => {
    if (withPassword) {
        const result = await UserSchema.findOne({ email }).select('+password').lean();
        return result;
    }
    const result = await UserSchema.findOne({ email }).lean();
    return result;
}

export const getAnalytics = async () => {
    const totalUsers = await UserSchema.countDocuments();
    const totalGroups = await groupSchema.countDocuments();
    const totalMessages = await Message.countDocuments();

    const totalGroupUsers = await groupSchema.aggregate([
        { $unwind: "$members" }, 
        { $group: { _id: null, total: { $sum: 1 } } } 
    ]);

    return {
        totalUsers,
        totalGroups,
        totalGroupUsers : totalGroupUsers[0]?.total || 0,
        totalMessages,
    };
}