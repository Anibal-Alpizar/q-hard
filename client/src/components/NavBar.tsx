import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import Button from "./common/Button";
import { LuLogOut } from "react-icons/lu";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { useMemberProvider } from "@/context/provider/MemberProvider";
import { CgClose } from "react-icons/cg";
import { FaHamburger } from "react-icons/fa";
import { GiHamburger, GiHamburgerMenu } from "react-icons/gi";

const navigation = [
  { name: "Panel", href: "/app" },
  { name: "Miembros", href: "/app/members" },
  { name: "Eventos", href: "/app/events" },
  { name: "Asociados", href: "/app/associates" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
  const pathname = usePathname();

  const { currentMember } = useMemberProvider() as any;

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-col justify-center flex-shrink-0 items-center relative top-2">
                  <Link href="/">
                    <Image
                      src="/favicon.svg"
                      alt="Logo"
                      width={50}
                      height={50}
                    />
                  </Link>
                  <p className="text-xs text-slate-500 mt-1">Asomameco</p>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? "border-slate-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      )}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-gradient-to-l  from-asomamecoPrimary-600 to-asomamecoPrimary-900" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {currentMember ? (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "flex w-full px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={() => {}}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "flex w-full px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={() => {}}
                            >
                              Sign in
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <CgClose className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <GiHamburgerMenu
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? "bg-slate-50 border-slate-500 text-slate-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                    "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              {currentMember ? (
                <>
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={() => {}}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => {}}
                    className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
