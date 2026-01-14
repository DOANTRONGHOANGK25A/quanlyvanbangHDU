import React, { useState } from "react";
import { Card, Table, Tag, Button, Space, Input, Modal, Typography, Row, Col, Statistic, Tooltip } from "antd";
import {
    FileTextOutlined,
    SearchOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { mockDiplomas, STATUS } from "../mock/mockData";
import "../styles/pages.css";

const { Title, Text } = Typography;

export function DiplomaListPage() {
    const [searchText, setSearchText] = useState("");

    const stats = {
        total: mockDiplomas.length,
        pending: mockDiplomas.filter((d) => d.status === STATUS.PENDING).length,
        approved: mockDiplomas.filter((d) => d.status === STATUS.APPROVED).length,
        issued: mockDiplomas.filter((d) => d.status === STATUS.ISSUED).length,
        revoked: mockDiplomas.filter((d) => d.status === STATUS.REVOKED).length,
    };

    const filteredData = mockDiplomas.filter(
        (d) =>
            d.serialNo.toLowerCase().includes(searchText.toLowerCase()) ||
            d.studentName.toLowerCase().includes(searchText.toLowerCase())
    );

    const openDetail = (record) => {
        Modal.info({
            title: (
                <Space>
                    <FileTextOutlined />
                    <span>Chi tiết hồ sơ văn bằng</span>
                </Space>
            ),
            width: 500,
            content: (
                <div className="modal-detail-content">
                    <div className="detail-item">
                        <Text type="secondary">Số hiệu:</Text>
                        <Text strong>{record.serialNo}</Text>
                    </div>
                    <div className="detail-item">
                        <Text type="secondary">Sinh viên:</Text>
                        <Text strong>{record.studentName}</Text>
                    </div>
                    <div className="detail-item">
                        <Text type="secondary">Ngành:</Text>
                        <Text>{record.major}</Text>
                    </div>
                    <div className="detail-item">
                        <Text type="secondary">Xếp loại:</Text>
                        <Text>{record.ranking}</Text>
                    </div>
                    <div className="detail-item">
                        <Text type="secondary">Trạng thái:</Text>
                        <Tag color={getStatusColor(record.status)}>{record.status}</Tag>
                    </div>
                    <div className="detail-item">
                        <Text type="secondary">TxID:</Text>
                        <Text code>{record.txId || "(Chưa phát hành)"}</Text>
                    </div>
                </div>
            ),
            okText: "Đóng",
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case STATUS.ISSUED:
                return "success";
            case STATUS.REVOKED:
                return "error";
            case STATUS.APPROVED:
                return "processing";
            default:
                return "warning";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case STATUS.ISSUED:
                return <CheckCircleOutlined />;
            case STATUS.REVOKED:
                return <CloseCircleOutlined />;
            case STATUS.APPROVED:
                return <ExclamationCircleOutlined />;
            default:
                return <ClockCircleOutlined />;
        }
    };

    const columns = [
        {
            title: "Số hiệu",
            dataIndex: "serialNo",
            sorter: (a, b) => a.serialNo.localeCompare(b.serialNo),
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: "Sinh viên",
            dataIndex: "studentName",
            sorter: (a, b) => a.studentName.localeCompare(b.studentName),
        },
        {
            title: "Ngành",
            dataIndex: "major",
            ellipsis: true,
        },
        {
            title: "Xếp loại",
            dataIndex: "ranking",
            width: 120,
            filters: [
                { text: "Xuất sắc", value: "Xuất sắc" },
                { text: "Giỏi", value: "Giỏi" },
                { text: "Khá", value: "Khá" },
                { text: "Trung bình", value: "Trung bình" },
            ],
            onFilter: (value, record) => record.ranking === value,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: 140,
            filters: Object.values(STATUS).map((s) => ({ text: s, value: s })),
            onFilter: (value, record) => record.status === value,
            render: (status) => (
                <Tag icon={getStatusIcon(status)} color={getStatusColor(status)}>
                    {status}
                </Tag>
            ),
        },
        {
            title: "Hành động",
            width: 100,
            align: "center",
            render: (_, record) => (
                <Tooltip title="Xem chi tiết">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => openDetail(record)}
                    />
                </Tooltip>
            ),
        },
    ];

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-header-icon list-icon">
                    <FileTextOutlined />
                </div>
                <div className="page-header-content">
                    <Title level={3} className="page-title">Danh sách hồ sơ</Title>
                    <Text type="secondary">
                        Quản lý và theo dõi tất cả hồ sơ văn bằng trong hệ thống
                    </Text>
                </div>
            </div>

            <Row gutter={16} className="stats-row">
                <Col xs={12} sm={8} md={4}>
                    <Card className="stat-card">
                        <Statistic title="Tổng số" value={stats.total} />
                    </Card>
                </Col>
                <Col xs={12} sm={8} md={5}>
                    <Card className="stat-card pending">
                        <Statistic
                            title="Chờ duyệt"
                            value={stats.pending}
                            valueStyle={{ color: "#faad14" }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={8} md={5}>
                    <Card className="stat-card approved">
                        <Statistic
                            title="Đã duyệt"
                            value={stats.approved}
                            valueStyle={{ color: "#1890ff" }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={8} md={5}>
                    <Card className="stat-card issued">
                        <Statistic
                            title="Đã phát hành"
                            value={stats.issued}
                            valueStyle={{ color: "#52c41a" }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={8} md={5}>
                    <Card className="stat-card revoked">
                        <Statistic
                            title="Đã thu hồi"
                            value={stats.revoked}
                            valueStyle={{ color: "#ff4d4f" }}
                        />
                    </Card>
                </Col>
            </Row>

            <Card className="table-card">
                <div className="table-header">
                    <Input
                        placeholder="Tìm kiếm theo số hiệu hoặc tên sinh viên..."
                        prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="search-input-table"
                        allowClear
                    />
                </div>

                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{
                        pageSize: 8,
                        showSizeChanger: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} của ${total} hồ sơ`,
                    }}
                    className="data-table"
                />
            </Card>
        </div>
    );
}
