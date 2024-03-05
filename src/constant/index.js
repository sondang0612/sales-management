export const MENU_USER_INFORMATION = [
  {
    infor: "Thông tin cá nhân",
    img: "/images/account.svg",
    url: "/user/profile",
  },
  {
    infor: "Nhập báo cáo",
    img: "/images/form.svg",
    url: "/user/create-report",
  },
  {
    infor: "Thống kê",
    img: "/images/analysis.svg",
    url: "/user/salons",
  },
  {
    infor: "Lịch sử",
    img: "/images/history.svg",
    url: "/user/history",
  },
  {
    infor: "Thoát",
    img: "/images/logout.svg",
    url: "/",
    isLogout: true,
  },
];

export const MENU_ADMIN_INFORMATION = [
  {
    infor: "Người dùng",
    img: "/images/account.svg",
    url: "/admin/users",
  },
  {
    infor: "Thoát",
    img: "/images/logout.svg",
    url: "/",
    isLogout: true,
  },
];

export const SALON_CATEGORIES = [
  {
    value: "no-account",
    label: "Salon mới tiếp cận (chưa có account)",
  },
  {
    value: "re-take-care-no-account",
    label: " Salon mới (chăm sóc lại)",
  },
  {
    value: "re-take-care-have-account",
    label: " Chăm sóc đã có account",
  },
];

export const CATEGORIES = {
  "no-account": {
    text: "Salon mới tiếp cận (Chưa có account)",
    bgColor: "bg-red-100",
    textColor: "text-red-500",
    borderColor: "border-red-500",
  },
  "re-take-care-no-account": {
    text: "Salon mới (chăm sóc lại)",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-500",
    borderColor: "border-yellow-500",
  },
  "re-take-care-have-account": {
    text: "Chăm sóc (đã có account)",
    bgColor: "bg-green-100",
    textColor: "text-green-500",
    borderColor: "border-green-500",
  },
};

export const SIZE = 6;
