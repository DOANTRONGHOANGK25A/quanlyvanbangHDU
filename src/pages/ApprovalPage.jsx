import React from "react";
import { Card, Table, Button, Space, Tag, Typography, Divider, Empty, Popconfirm, message, Tooltip } from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { mockDiplomas, STATUS } from "../mock/mockData";
import "../styles/pages.css";

const { Title, Text } = Typography;

export function ApprovalPage() {
    const data = mockDiplomas.filter((d) => d.status === STATUS.PENDING);

    const handleApprove = (record) => {
        message.success(`Đã duyệt hồ sơ ${record.serialNo} (Demo)`);
    };

    const handleReject = (record) => {
        message.error(`Đã từ chối hồ sơ ${record.serialNo} (Demo)`);
    };

    const columns = [
        {
            title: "Số hiệu",
            dataIndex: "serialNo",
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: "Sinh viên",
            dataIndex: "studentName",
        },
        {
            title: "Ngành",
            dataIndex: "major",
            ellipsis: true,
        },
        {
            title: "Ngày tạo",
            dataIndex: "date",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: () => (
                <Tag icon={<ClockCircleOutlined />} color="warning">
                    Chờ duyệt
                </Tag>
            ),
        },
        {
            title: "Hành động",
            width: 200,
            align: "center",
            render: (_, record) => (
                <Space>
                    <Tooltip title="Xem chi tiết">
                        <Button type="text" icon={<EyeOutlined />} />
                    </Tooltip>
                    <Popconfirm
                        title="Xác nhận duyệt"
                        description="Bạn có chắc muốn duyệt hồ sơ này?"
                        onConfirm={() => handleApprove(record)}
                        okText="Duyệt"
                        cancelText="Hủy"
                    >
                        <Button type="primary" icon={<CheckCircleOutlined />}>
                            Duyệt
                        </Button>
                    </Popconfirm>
                    <Popconfirm
                        title="Xác nhận từ chối"
                        description="Bạn có chắc muốn từ chối hồ sơ này?"
                        onConfirm={() => handleReject(record)}
                        okText="Từ chối"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Tooltip title="Từ chối">
                            <Button danger icon={<CloseCircleOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-header-icon approval-icon">
                    <CheckCircleOutlined />
                </div>
                <div className="page-header-content">
                    <Title level={3} className="page-title">Duyệt hồ sơ</Title>
                    <Text type="secondary">
                        Xem xét và phê duyệt các hồ sơ văn bằng đang chờ xử lý
                    </Text>
                </div>
            </div>

            <Divider />

            <Card className="info-card">
                <Space>
                    <ClockCircleOutlined style={{ color: "#faad14", fontSize: 20 }} />
                    <Text>
                        Có <Text strong style={{ color: "#faad14" }}>{data.length}</Text> hồ sơ đang chờ được duyệt
                    </Text>
                </Space>
            </Card>

            <Card className="table-card" style={{ marginTop: 16 }}>
                {data.length > 0 ? (
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            pageSize: 8,
                            showTotal: (total) => `Tổng ${total} hồ sơ`,
                        }}
                        className="data-table"
                    />
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                            <Text type="secondary">
                                Không có hồ sơ nào đang chờ duyệt
                            </Text>
                        }
                    />
                )}
            </Card>
        </div>
    );
}
