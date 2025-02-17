"use client";

import { useState, useEffect } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { contentData } from "@/config/contentData"; 
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredItems, setFilteredItems] = useState(contentData); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveItem(window.location.pathname);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    setActiveItem(href);
    closeMenu();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = contentData.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
    );
    setFilteredItems(filtered); 
  };

  const handleSuggestionClick = (item: { title: string; href: string }) => {
    setSearchQuery(item.title); 
    setFilteredItems([]); 
  };

  const searchInput = (
    <div className="relative w-full">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        value={searchQuery}
        onChange={handleSearchChange} 
      />
      {searchQuery && filteredItems.length > 0 && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 w-full max-h-60 overflow-auto">
          {filteredItems.map((item) => (
            <NextLink href={item.href} key={item.href}>
              <div
                className="p-2 hover:bg-gray-200 rounded-md text-sm cursor-pointer"
                onClick={() => handleSuggestionClick(item)}
              >
                <strong>{item.title}</strong>
                <p className="text-gray-600 truncate">{item.content}</p>
              </div>
            </NextLink>
          ))}
          {filteredItems.length === 0 && (
            <div className="p-2">No results found</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">KD</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 center ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={linkStyles({
                  color: activeItem === item.href ? "primary" : "foreground",
                })}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="relative hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle onClick={toggleMenu} aria-pressed={menuOpen} />
      </NavbarContent>

      <NavbarMenu open={menuOpen} onClose={closeMenu}>
        <div className="relative">{searchInput}</div>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <NextLink
                href={item.href}
                onClick={() => handleNavClick(item.href)}
              >
                <Link
                  color={activeItem === item.href ? "primary" : "foreground"}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
