import React from "react";
import { Form, Input, Button, Card, Checkbox, Typography, Space, message, Table, Tag } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data/Data";
import "../styles/login.css";

const { Title, Text } = Typography;

export function LoginPage() {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log("Login values:", values);
        message.success("Đăng nhập thành công!");
        navigate("/verify");
    };

    const getRoleTag = (role) => {
        switch (role) {
            case "ADMIN":
                return <Tag color="red">Quản trị viên</Tag>;
            case "PRINCIPAL":
                return <Tag color="gold">Hiệu trưởng</Tag>;
            case "ACADEMIC_AFFAIRS":
                return <Tag color="blue">Phòng Đào tạo</Tag>;
            case "STAFF":
                return <Tag color="green">Nhân viên</Tag>;
            default:
                return <Tag>{role}</Tag>;
        }
    };

    const accountColumns = [
        {
            title: "Tài khoản",
            dataIndex: "username",
            key: "username",
            render: (text) => <Text code copyable>{text}</Text>,
        },
        {
            title: "Mật khẩu",
            dataIndex: "password",
            key: "password",
            render: (text) => <Text code copyable>{text}</Text>,
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            render: (role) => getRoleTag(role),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            ellipsis: true,
        },
    ];

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="login-overlay"></div>
            </div>

            <div className="login-content">
                <Card className="login-card">
                    <div className="login-header">
                        <div className="login-logo">🎓</div>
                        <Title level={2} className="login-title">
                            Diploma System
                        </Title>
                        <Text type="secondary">
                            Hệ thống quản lý văn bằng số
                        </Text>
                    </div>

                    <Form
                        name="login"
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                        size="large"
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="input-icon" />}
                                placeholder="Tên đăng nhập"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Vui lòng nhập mật khẩu!" },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="input-icon" />}
                                placeholder="Mật khẩu"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Space style={{ width: "100%", justifyContent: "space-between" }}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                                </Form.Item>
                                <a className="login-forgot" href="#">
                                    Quên mật khẩu?
                                </a>
                            </Space>
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 12 }}>
                            <Button type="primary" htmlType="submit" block>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card className="demo-accounts-card" title="Tài khoản demo">
                    <Table
                        dataSource={mockUsers}
                        columns={accountColumns}
                        rowKey="id"
                        pagination={false}
                        size="small"
                    />
                </Card>

                <div className="login-info">
                    <Text type="secondary">© 2025 Diploma System. All rights reserved.</Text>
                </div>
            </div>
        </div>
    );
}
