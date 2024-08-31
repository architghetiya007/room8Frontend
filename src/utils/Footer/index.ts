interface CompanyMenuProps {
  name: string;
  route: string;
}

export const CompanyMenus: CompanyMenuProps[] = [
  {
    name: "About Us",
    route: "/aboutus",
  },
  {
    name: "FAQ",
    route: "/faq",
  },
  {
    name: "How it works",
    route: "/howitworks",
  },
  {
    name: "Support",
    route: "/support",
  },
];
