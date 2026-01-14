export const STATUS = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    ISSUED: "ISSUED",
    REVOKED: "REVOKED",
};

export const mockDiplomas = [
    { id: 101, serialNo: "TN2025-001", studentName: "Phạm Minh Hoàng", major: "CNTT", ranking: "Xuất sắc", status: STATUS.ISSUED, txId: "0x8f2...3a1", date: "2025-01-10" },
    { id: 102, serialNo: "TN2025-002", studentName: "Lê Thị Mai", major: "Kinh tế", ranking: "Giỏi", status: STATUS.APPROVED, txId: null, date: "2025-01-11" },
    { id: 103, serialNo: "TN2025-003", studentName: "Trần Văn Tèo", major: "Ngôn ngữ Anh", ranking: "Khá", status: STATUS.PENDING, txId: null, date: "2025-01-12" },
    { id: 104, serialNo: "TN2024-999", studentName: "Lê Văn Luyện", major: "Võ thuật", ranking: "Trung bình", status: STATUS.REVOKED, txId: "0x999...bad", date: "2024-12-01" },
];
