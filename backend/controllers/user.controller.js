import { changePasswordService, deleteUserService, getUserByIdService, getUsersService, updateRoleService, updateStatusUserService, updateUserService } from "../services/user.service.js";

export const getUsers = async (req, res) => {
    try {
        const users = await getUsersService();
        return res.status(200).json({message: "Lay danh sach nguoi dung thanh cong", users});
    } catch (err) {
        console.error("Loi lay danh sach nguoi dung");
        return res.status(500).json({message: err.message});
    }
}
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(id);
        return res.status(200).json({message: "Lay thong tin nguoi dung thanh cong", user})
    } catch (err) {
        console.error("Loi lay thong tin nguoi dung");
        return res.status(500).json({message: err.message});
    }
}
export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        await deleteUserService(id);
        return res.status(200).json({message: "Xoa nguoi dung thanhf cong"});
    } catch (err) {
        console.error("Loi xoa nguoi dung");
        return res.status(500).json({message: err.message});
    }
}
export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {fullname, displayName, avatar} = req.body;
        if (req.user.role !== "admin" && req.user.userId !== id) {
            return res.status(403).json({message: "Ban khong du quyen truy cap"})
        }
        const user = await updateUserService({id, fullname, displayName, avatar});
        return res.status(200).json({message: "Cap nhat nguoi dung thanh cong", user});
    } catch (err) {
        console.error("Loi cap nhat nguoi dung", err.message);
        return res.status(500).json({message: err.message});
    }
}
export const changePassword = async (req, res) => {
    try {
        const {password, newpassword, renewpassword} = req.body;
        const userId = req.user.userId;
        await changePasswordService({password, newpassword, renewpassword, userId});
        return res.status(200). json({message: "Thay doi mk thanh cong"});
    } catch (err) {
        console.error("Loi thay doi mk");
        return res.status(500).json({message: err.message});
    }
}
export const updateRole = async (req, res) => {
    try {
        const {id} = req.params;
        const {role} = req.body;
        const user = await updateRoleService({id, role});
        return res.status(200).json({message: "Cap nhat vai tro nguoi dung thanh cong", user});
    } catch (err) {
        console.error("Loi cap nhat vai tro nguoi dung");
        return res.status(500).json({message: err.message});
    }
}
export const updateStatusUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const user = await updateStatusUserService({id, status});
        return res.status(200).json({message: "Cap nhat trang thai nguoi dung thanh cong", user});
    } catch (err) {
        console.error("Loi cap nhat trang thai nguoi dung");
        return res.status(500).json({message: err.message});
    }
}
