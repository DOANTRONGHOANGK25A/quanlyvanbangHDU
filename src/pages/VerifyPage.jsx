import React, { useState } from "react";
import { Card, Input, Result, Typography, Space, Divider, Empty, Spin } from "antd";
import { SearchOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import "../styles/pages.css";

const { Title, Text, Paragraph } = Typography;

export function VerifyPage() {
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = (value) => {
        if (!value) return;
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSearched(true);
        }, 1000);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-header-icon verify-icon">
                    <SafetyCertificateOutlined />
                </div>
                <div className="page-header-content">
                    <Title level={3} className="page-title">Tra cứu văn bằng</Title>
                    <Text type="secondary">
                        Xác thực văn bằng bằng cách nhập số hiệu hoặc mã QR
                    </Text>
                </div>
            </div>

            <Divider />

            <Card className="search-card">
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <div className="search-wrapper">
                        <Input.Search
                            size="large"
                            placeholder="Nhập số hiệu văn bằng (VD: TN2025-001)"
                            enterButton={
                                <Space>
                                    <SearchOutlined />
                                    <span>Tra cứu</span>
                                </Space>
                            }
                            onSearch={handleSearch}
                            loading={loading}
                            className="search-input"
                        />
                    </div>
                    <Paragraph type="secondary" className="search-hint">
                        Bạn có thể tìm kiếm bằng số hiệu văn bằng, mã sinh viên, hoặc quét mã QR trên văn bằng
                    </Paragraph>
                </Space>
            </Card>

            <div style={{ marginTop: 24 }}>
                {loading ? (
                    <Card className="result-card">
                        <div className="loading-wrapper">
                            <Spin size="large" />
                            <Text type="secondary" style={{ marginTop: 16 }}>
                                Đang tra cứu thông tin...
                            </Text>
                        </div>
                    </Card>
                ) : searched ? (
                    <Card className="result-card">
                        <Result
                            icon={<SafetyCertificateOutlined style={{ color: "#52c41a" }} />}
                            title="Kết quả tra cứu"
                            subTitle="Đây là giao diện demo. Kết quả thực tế sẽ hiển thị thông tin văn bằng từ blockchain."
                        />
                    </Card>
                ) : (
                    <Card className="result-card">
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <Text type="secondary">
                                    Nhập số hiệu văn bằng để bắt đầu tra cứu
                                </Text>
                            }
                        />
                    </Card>
                )}
            </div>
        </div>
    );
}
