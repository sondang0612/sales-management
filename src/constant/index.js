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

export const SIZE = 6;
