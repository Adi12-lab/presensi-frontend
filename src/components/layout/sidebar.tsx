import { useState, useContext } from "react";
import { Sidebar as SidebarComponent, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { GripVertical, Home, Power } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { AuthContext } from "~/context/auth";
import ServiceAuth from "~/actions/authentication";

import { rgbToHex } from "~/lib/utils";
import { Role } from "~/schema";

interface SidebarProps {
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
  setBroken: (broken: boolean) => void;
}

type NavLinksType = {
  link: string;
  label: string;
  role: Array<Role>;
};

function Sidebar({ toggled, setToggled, setBroken }: SidebarProps) {
  const location = useLocation();
  const { akun } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  // const [toggled, setToggled] = useState(false);

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: ServiceAuth.logout,
    onSuccess: () => {
      window.location.href = "/login"; //sekalian refresh
    },
  });

  const navlinks: NavLinksType[] = [
    { link: "/dashboard", label: "Dashboard", role: ["admin", "dosen"] },
    { link: "/akun", label: "Akun", role: ["admin"] },
    { link: "/dosen", label: "Dosen", role: ["admin"] },
    { link: "/mahasiswa", label: "Mahasiswa", role: ["admin"] },
    { link: "/prodi", label: "Program Studi", role: ["admin"] },
    { link: "/matakuliah", label: "Matakuliah", role: ["admin"] },
    { link: "/pertemuan", label: "Pertemuan", role: ["dosen"] },
  ];

  return (
    <SidebarComponent
      backgroundColor="#1f2937"
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      breakPoint="md"
      onBreakPoint={setBroken}
      rootStyles={{
        color: "#8A8C91",
      }}
    >
      <div className="p-6 bg-zinc-600 flex justify-between">
        <h1
          className={`font-bold text-xl text-nowrap text-stone-300 ${
            collapsed ? "hidden" : ""
          }`}
        >
          Admin Page
        </h1>
        <button type="button" onClick={() => setCollapsed(!collapsed)}>
          <GripVertical className="text-stone-400 hover:text-stone-300" />
        </button>
      </div>
      <Menu
        menuItemStyles={{
          button: {
            ":hover": {
              backgroundColor: "#1f2937",
              ["& > .ps-menu-icon, & > .ps-menu-label"]: {
                color: rgbToHex("214,211,209"),
              },
            },
            ["&.ps-active"]: {
              ["& > .ps-menu-icon, & > .ps-menu-label"]: {
                color: rgbToHex("214,211,209"),
              },
            },
          },
          label: {
            marginTop: "3px",
            opacity: collapsed ? 0 : 1,
          },
        }}
      >
        {navlinks.map((link) =>
          link.role.includes(akun.role) ? (
            <MenuItem
              key={link.link}
              component={<NavLink to={link.link} />}
              icon={<Home size={20} />}
              active={location.pathname === link.link}
            >
              {link.label}
            </MenuItem>
          ) : (
            ""
          )
        )}
        <MenuItem icon={<Power />} onClick={() => logoutMutation.mutate()}>
          Logout
        </MenuItem>
      </Menu>
    </SidebarComponent>
  );
}

export default Sidebar;
