import React from "react";
import { Form, Input, Button, Card, Checkbox, Typography, Space, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const { Title, Text } = Typography;

export function LoginPage() {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log("Login values:", values);
        message.success("Đăng nhập thành công!");
        navigate("/verify");
    };

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

                    <div className="login-footer">
                        <Text type="secondary">
                            Demo Mode - Nhấn đăng nhập để tiếp tục
                        </Text>
                    </div>
                </Card>

                <div className="login-info">
                    <Text type="secondary">© 2025 Diploma System. All rights reserved.</Text>
                </div>
            </div>
        </div>
    );
}
