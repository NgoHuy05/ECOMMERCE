import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const getUsersService = async () => {
    const users = await User.find().select("-password").lean();
    return users || [];
}
export const getUserByIdService = async (id) => {
    const user = await User.findById(id).select("-password").lean();
    if (!user) {
        throw new Error("Khong tim thay nguoi dung");
    }
    return user;
}
export const deleteUserService = async (id) => {
    await User.findByIdAndDelete(id);
}
export const updateUserService = async (data) => {
    const {id, fullname, displayName, avatar} = data;
    const updateData = {};
    if (fullname !== undefined) updateData.fullname = fullname;
    if (displayName !== undefined) updateData.displayName = displayName;
    if (avatar !== undefined) updateData.avatar = avatar;

    const user = await User.findByIdAndUpdate(
        id,
        updateData,
        { returnDocument: 'after' , runValidators: true }
    );


    return user;
}
export const changePasswordService = async (data) => {
    const {password, newpassword, renewpassword, userId} = data;

    if (!password || !newpassword || !renewpassword) {
        throw new Error("Vui long nhap day du thong tin");
    }

    if (newpassword !== renewpassword) {
        throw new Error("Mat khau moi chua trung nhau");
    }

    const user = await User.findById(userId);
    if (!user) throw new Error("User khong ton tai");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Mat khau chua chinh xac");
    }

    const hashed = await bcrypt.hash(newpassword, 10);

    user.password = hashed;
    await user.save();
}
export const updateRoleService = async (data) => {
    const {id, role} = data;

    const user = await User.findByIdAndUpdate(
        id,
        { role },
        { returnDocument: 'after' }
    );

    return user;
}
export const updateStatusUserService = async (data) => {
    const {id, status} = data;

    const user = await User.findByIdAndUpdate(
        id,
        { status },
        { returnDocument: 'after' }
    );

    return user;
}
