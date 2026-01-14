import React from "react";
import { Card, Form, Input, InputNumber, Select, Button, Space, Upload, Typography, Divider, Row, Col, message } from "antd";
import { InboxOutlined, PlusCircleOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/pages.css";

const { Dragger } = Upload;
const { Title, Text } = Typography;
const { TextArea } = Input;

export function DiplomaCreatePage() {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log("Form values:", values);
        message.success("Hồ sơ đã được tạo thành công! (Demo)");
        form.resetFields();
    };

    const handleCancel = () => {
        navigate("/diplomas");
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-header-icon create-icon">
                    <PlusCircleOutlined />
                </div>
                <div className="page-header-content">
                    <Title level={3} className="page-title">Tạo hồ sơ văn bằng</Title>
                    <Text type="secondary">
                        Nhập thông tin để tạo hồ sơ văn bằng mới trong hệ thống
                    </Text>
                </div>
            </div>

            <Divider />

            <Card className="form-card">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    size="large"
                >
                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Số hiệu văn bằng"
                                name="serialNo"
                                rules={[
                                    { required: true, message: "Vui lòng nhập số hiệu văn bằng" },
                                    { pattern: /^[A-Z]{2}\d{4}-\d{3}$/, message: "Định dạng: XX0000-000" },
                                ]}
                            >
                                <Input placeholder="VD: TN2025-001" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Mã sinh viên"
                                name="studentId"
                                rules={[{ required: true, message: "Vui lòng nhập mã sinh viên" }]}
                            >
                                <Input placeholder="VD: 20210001" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Họ và tên sinh viên"
                                name="studentName"
                                rules={[{ required: true, message: "Vui lòng nhập họ tên sinh viên" }]}
                            >
                                <Input placeholder="Nhập họ và tên đầy đủ" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Ngày sinh"
                                name="birthDate"
                            >
                                <Input placeholder="DD/MM/YYYY" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Chuyên ngành"
                                name="major"
                                rules={[{ required: true, message: "Vui lòng nhập chuyên ngành" }]}
                            >
                                <Input placeholder="VD: Công nghệ thông tin" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={6}>
                            <Form.Item
                                label="Xếp loại tốt nghiệp"
                                name="ranking"
                                initialValue="Khá"
                            >
                                <Select
                                    options={[
                                        { value: "Xuất sắc", label: "Xuất sắc" },
                                        { value: "Giỏi", label: "Giỏi" },
                                        { value: "Khá", label: "Khá" },
                                        { value: "Trung bình", label: "Trung bình" },
                                    ]}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={6}>
                            <Form.Item
                                label="Năm tốt nghiệp"
                                name="graduationYear"
                                initialValue="2025"
                            >
                                <Select
                                    options={[
                                        { value: "2025", label: "2025" },
                                        { value: "2024", label: "2024" },
                                        { value: "2023", label: "2023" },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col xs={24} md={6}>
                            <Form.Item
                                label="GPA"
                                name="gpa"
                            >
                                <InputNumber
                                    placeholder="Ví dụ: 3.25"
                                    min={0}
                                    max={4}
                                    precision={2}
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="Bảng điểm (ảnh/PDF)" name="transcript">
                        <Dragger
                            accept=".pdf,image/*"
                            maxCount={1}
                            className="upload-dragger"
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined style={{ color: "#1890ff" }} />
                            </p>
                            <p className="ant-upload-text">
                                Kéo thả hoặc bấm để chọn file
                            </p>
                            <p className="ant-upload-hint">
                                Chấp nhận PDF/JPG/PNG.
                            </p>
                        </Dragger>
                    </Form.Item>

                    <Form.Item label="Ghi chú" name="notes">
                        <TextArea rows={3} placeholder="Ghi chú thêm (nếu có)" />
                    </Form.Item>

                    <Form.Item label="Tải lên file PDF văn bằng">
                        <Dragger
                            beforeUpload={() => false}
                            maxCount={1}
                            accept=".pdf"
                            className="upload-dragger"
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined style={{ color: "#1890ff" }} />
                            </p>
                            <p className="ant-upload-text">
                                Kéo thả file PDF vào đây hoặc click để chọn file
                            </p>
                            <p className="ant-upload-hint">
                                Hỗ trợ định dạng PDF. Kích thước tối đa 10MB
                            </p>
                        </Dragger>
                    </Form.Item>

                    <Divider />

                    <div className="form-actions">
                        <Button
                            icon={<CloseOutlined />}
                            onClick={handleCancel}
                            size="large"
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                            size="large"
                        >
                            Lưu hồ sơ
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}
