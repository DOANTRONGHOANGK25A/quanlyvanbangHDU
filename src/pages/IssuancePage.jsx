import React from "react";
import { Card, Tabs, Table, Button, Tag, Typography, Divider, Space, Popconfirm, message, Tooltip, Empty } from "antd";
import {
    SendOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    RocketOutlined,
    StopOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { mockDiplomas, STATUS } from "../mock/mockData";
import "../styles/pages.css";

const { Title, Text } = Typography;

export function IssuancePage() {
    const ready = mockDiplomas.filter((d) => d.status === STATUS.APPROVED);
    const issued = mockDiplomas.filter((d) => d.status === STATUS.ISSUED);
    const revoked = mockDiplomas.filter((d) => d.status === STATUS.REVOKED);

    const handleIssue = (record) => {
        message.success(`Đã phát hành văn bằng ${record.serialNo} lên blockchain (Demo)`);
    };

    const handleRevoke = (record) => {
        message.warning(`Đã thu hồi văn bằng ${record.serialNo} (Demo)`);
    };

    const columnsReady = [
        {
            title: "Số hiệu",
            dataIndex: "serialNo",
            render: (text) => <Text strong>{text}</Text>,
        },
        { title: "Sinh viên", dataIndex: "studentName" },
        { title: "Ngành", dataIndex: "major", ellipsis: true },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: () => (
                <Tag icon={<CheckCircleOutlined />} color="processing">
                    Đã duyệt
                </Tag>
            ),
        },
        {
            title: "Hành động",
            width: 180,
            align: "center",
            render: (_, record) => (
                <Space>
                    <Tooltip title="Xem chi tiết">
                        <Button type="text" icon={<EyeOutlined />} />
                    </Tooltip>
                    <Popconfirm
                        title="Xác nhận phát hành"
                        description="Văn bằng sẽ được ghi lên blockchain. Tiếp tục?"
                        onConfirm={() => handleIssue(record)}
                        okText="Phát hành"
                        cancelText="Hủy"
                    >
                        <Button type="primary" icon={<RocketOutlined />}>
                            Phát hành
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const columnsIssued = [
        {
            title: "Số hiệu",
            dataIndex: "serialNo",
            render: (text) => <Text strong>{text}</Text>,
        },
        { title: "Sinh viên", dataIndex: "studentName" },
        { title: "Ngành", dataIndex: "major", ellipsis: true },
        {
            title: "TxID",
            dataIndex: "txId",
            ellipsis: true,
            render: (text) => (
                <Text code copyable={{ text }}>
                    {text?.substring(0, 16)}...
                </Text>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: () => (
                <Tag icon={<CheckCircleOutlined />} color="success">
                    Đã phát hành
                </Tag>
            ),
        },
        {
            title: "Hành động",
            width: 160,
            align: "center",
            render: (_, record) => (
                <Space>
                    <Tooltip title="Xem chi tiết">
                        <Button type="text" icon={<EyeOutlined />} />
                    </Tooltip>
                    <Popconfirm
                        title="Xác nhận thu hồi"
                        description="Văn bằng sẽ bị đánh dấu thu hồi trên blockchain. Tiếp tục?"
                        onConfirm={() => handleRevoke(record)}
                        okText="Thu hồi"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Button danger icon={<StopOutlined />}>
                            Thu hồi
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const columnsRevoked = [
        {
            title: "Số hiệu",
            dataIndex: "serialNo",
            render: (text) => <Text strong>{text}</Text>,
        },
        { title: "Sinh viên", dataIndex: "studentName" },
        { title: "Ngành", dataIndex: "major", ellipsis: true },
        {
            title: "TxID",
            dataIndex: "txId",
            ellipsis: true,
            render: (text) => (
                <Text code copyable={{ text }}>
                    {text?.substring(0, 16)}...
                </Text>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: () => (
                <Tag icon={<CloseCircleOutlined />} color="error">
                    Đã thu hồi
                </Tag>
            ),
        },
        {
            title: "Hành động",
            width: 100,
            align: "center",
            render: () => (
                <Tooltip title="Xem chi tiết">
                    <Button type="text" icon={<EyeOutlined />} />
                </Tooltip>
            ),
        },
    ];

    const renderTable = (columns, data, emptyText) => {
        if (data.length === 0) {
            return (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={<Text type="secondary">{emptyText}</Text>}
                />
            );
        }
        return (
            <Table
                rowKey="id"
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 6,
                    showTotal: (total) => `Tổng ${total} hồ sơ`,
                }}
                className="data-table"
            />
        );
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-header-icon issuance-icon">
                    <SendOutlined />
                </div>
                <div className="page-header-content">
                    <Title level={3} className="page-title">Phát hành & Thu hồi</Title>
                    <Text type="secondary">
                        Quản lý việc phát hành văn bằng lên blockchain và thu hồi khi cần thiết
                    </Text>
                </div>
            </div>

            <Divider />

            <Card className="tabs-card">
                <Tabs
                    type="card"
                    items={[
                        {
                            key: "ready",
                            label: (
                                <Space>
                                    <CheckCircleOutlined />
                                    <span>Chờ phát hành ({ready.length})</span>
                                </Space>
                            ),
                            children: renderTable(columnsReady, ready, "Không có hồ sơ nào đang chờ phát hành"),
                        },
                        {
                            key: "issued",
                            label: (
                                <Space>
                                    <RocketOutlined />
                                    <span>Đã phát hành ({issued.length})</span>
                                </Space>
                            ),
                            children: renderTable(columnsIssued, issued, "Chưa có văn bằng nào được phát hành"),
                        },
                        {
                            key: "revoked",
                            label: (
                                <Space>
                                    <StopOutlined />
                                    <span>Đã thu hồi ({revoked.length})</span>
                                </Space>
                            ),
                            children: renderTable(columnsRevoked, revoked, "Không có văn bằng nào bị thu hồi"),
                        },
                    ]}
                />
            </Card>
        </div>
    );
}
