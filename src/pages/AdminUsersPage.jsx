import React, { useState } from "react";
import { Card, Table, Button, Space, Tag, Typography, Divider, Modal, Form, Input, Select, message, Tooltip, Popconfirm } from "antd";
import {
    UserOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    KeyOutlined,
} from "@ant-design/icons";
import "../styles/pages.css";

const { Title, Text } = Typography;

const mockUsers = [
    { id: 1, username: "admin", fullName: "Quản trị viên", email: "admin@university.edu.vn", role: "admin", status: "active" },
    { id: 2, username: "staff01", fullName: "Nguyễn Văn A", email: "nva@university.edu.vn", role: "staff", status: "active" },
    { id: 3, username: "staff02", fullName: "Trần Thị B", email: "ttb@university.edu.vn", role: "staff", status: "active" },
    { id: 4, username: "approver01", fullName: "Lê Văn C", email: "lvc@university.edu.vn", role: "approver", status: "inactive" },
];

const roleColors = {
    admin: "red",
    staff: "blue",
    approver: "green",
};

const roleLabels = {
    admin: "Quản trị viên",
    staff: "Nhân viên",
    approver: "Người duyệt",
};

export function AdminUsersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleCreate = () => {
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleSubmit = (values) => {
        console.log("User values:", values);
        message.success("Tạo người dùng thành công! (Demo)");
        setIsModalOpen(false);
    };

    const handleDelete = (record) => {
        message.success(`Đã xóa người dùng ${record.username} (Demo)`);
    };

    const columns = [
        {
            title: "Tên đăng nhập",
            dataIndex: "username",
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: "Họ và tên",
            dataIndex: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            render: (role) => (
                <Tag color={roleColors[role]}>{roleLabels[role]}</Tag>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (status) => (
                <Tag color={status === "active" ? "success" : "default"}>
                    {status === "active" ? "Hoạt động" : "Ngừng hoạt động"}
                </Tag>
            ),
        },
        {
            title: "Hành động",
            width: 150,
            align: "center",
            render: (_, record) => (
                <Space>
                    <Tooltip title="Chỉnh sửa">
                        <Button type="text" icon={<EditOutlined />} />
                    </Tooltip>
                    <Tooltip title="Đặt lại mật khẩu">
                        <Button type="text" icon={<KeyOutlined />} />
                    </Tooltip>
                    <Popconfirm
                        title="Xác nhận xóa"
                        description="Bạn có chắc muốn xóa người dùng này?"
                        onConfirm={() => handleDelete(record)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Tooltip title="Xóa">
                            <Button type="text" danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-header-icon admin-icon">
                    <UserOutlined />
                </div>
                <div className="page-header-content">
                    <Title level={3} className="page-title">Quản lý người dùng</Title>
                    <Text type="secondary">
                        Quản lý tài khoản người dùng và phân quyền trong hệ thống
                    </Text>
                </div>
            </div>

            <Divider />

            <Card className="table-card">
                <div className="table-header">
                    <Text>Tổng số: <Text strong>{mockUsers.length}</Text> người dùng</Text>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleCreate}
                    >
                        Thêm người dùng
                    </Button>
                </div>

                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={mockUsers}
                    pagination={{
                        pageSize: 8,
                        showTotal: (total) => `Tổng ${total} người dùng`,
                    }}
                    className="data-table"
                />
            </Card>

            <Modal
                title={
                    <Space>
                        <UserOutlined />
                        <span>Thêm người dùng mới</span>
                    </Space>
                }
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={500}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    style={{ marginTop: 24 }}
                >
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
                    >
                        <Input placeholder="Nhập tên đăng nhập" />
                    </Form.Item>

                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                    >
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email" },
                            { type: "email", message: "Email không hợp lệ" },
                        ]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item
                        label="Vai trò"
                        name="role"
                        rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
                    >
                        <Select
                            placeholder="Chọn vai trò"
                            options={[
                                { value: "admin", label: "Quản trị viên" },
                                { value: "staff", label: "Nhân viên" },
                                { value: "approver", label: "Người duyệt" },
                                { value: "principal", label: "Hiệu trưởng" }
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <div className="modal-actions">
                        <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
                        <Button type="primary" htmlType="submit">
                            Tạo người dùng
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
