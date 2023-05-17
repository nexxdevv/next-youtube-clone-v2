"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import {
  ArrowUpLeft,
  ArrowLeft,
  Bell,
  Cast,
  ChevronLeft,
  ChevronRight,
  Mic,
  Search,
  Video,
} from "react-feather"
import tw from "tailwind-styled-components"
import Headroom from "react-headroom"
import { usePathname } from "next/navigation"
import * as MenuIcon from "@/public/icons/icons"
import { animated, useSpring } from "react-spring"

const HeaderContainer = tw.header`
bg-white dark:bg-neutral-900 relative
`
const Logo = tw(Link)`
sm:ml-[66px]
`
const Icon = tw.button`
grid place-items-center rounded-full font-semibold w-9 h-9 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/90
`
const MenuBackdrop = tw.div`
fixed inset-0 bg-black/70 z-10 transition-opacity duration-400 h-screen ease-in hidden sm:block
`
const SearchBackdrop = tw.div`
  fixed inset-0 h-screen bg-gradient-to-b from-neutral-900/50 to-neutral-900/80 z-10 dark:from-neutral-800/50 dark:to-transparent transition-opacity duration-500 ease-in-out md:hidden
`
const Nav = tw.nav`
flex items-center gap-3 h-[64px]
px-4 w-full pb-1 relative
`
const LowerNav = tw.nav`
px-4 flex items-center overflow-x-scroll group sm:ml-[66px] relative
`
const Searchbar = () => {
  return (
    <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 min-w-[340px] lg:min-w-[420px] z-10">
      <div className="relative w-full mx-4">
        <input
          type="search"
          placeholder="Search"
          className="rounded-full bg-neutral-200/50 dark:bg-neutral-700 py-2.5 pl-6 w-full outline-none "
        />
        <Icon className="flex-shrink-0 absolute right-1 top-1/2 -translate-y-1/2">
          <MenuIcon.MicIcon className="opacity-50" />
        </Icon>
      </div>
    </div>
  )
}
const SearchDropdown = ({ openSearch, searchRef, handleSearch }) => {
  const searchSpring = useSpring({
    transform: openSearch ? "translateY(0)" : "translateY(-230px)",
    opacity: openSearch ? 1 : 0,
  })
  return (
    <animated.div
      style={searchSpring}
      className="fixed z-10 bg-white dark:bg-neutral-800 w-full top-0 left-0 md:hidden shadow"
    >
      <div className="h-[54px] flex items-center justify-center">
        <div className="relative w-full mx-4">
          <Icon
            onClick={handleSearch}
            className="flex-shrink-0 absolute left-1 top-1/2 -translate-y-1/2"
          >
            <ArrowLeft size={26} className="flex-shrink-0 opacity-50" />
          </Icon>
          <input
            ref={searchRef}
            type="search"
            placeholder="Search"
            className="rounded-full bg-neutral-200/50 dark:bg-neutral-700 py-2.5 pl-12 w-full outline-none "
          />
          <Icon className="flex-shrink-0 absolute right-1 top-1/2 -translate-y-1/2">
            <MenuIcon.MicIcon className="opacity-50" />
          </Icon>
        </div>
      </div>
      <ul className="font-medium">
        <li className="flex items-center gap-4 py-2.5 px-4 hover:bg-neutral-200/70">
          <Icon className="opacity-50">
            <MenuIcon.SearchIcon />
          </Icon>
          <p>power book 2 season 3 episode 10</p>
          <Icon className="ml-auto">
            <ArrowUpLeft className="opacity-50" />
          </Icon>
        </li>
        <li className="flex items-center gap-4 py-2.5 px-4 hover:bg-neutral-200/70">
          <Icon className="opacity-50">
            <MenuIcon.SearchIcon />
          </Icon>
          <p>mayachin shrine</p>
          <Icon className="ml-auto">
            <ArrowUpLeft className="opacity-50" />
          </Icon>
        </li>
        <li className="flex items-center gap-4 py-2.5 px-4 hover:bg-neutral-200/70">
          <Icon className="opacity-50">
            <MenuIcon.SearchIcon />
          </Icon>
          <p>jidion reacts to lil malibu</p>
          <Icon className="ml-auto">
            <ArrowUpLeft className="opacity-50" />
          </Icon>
        </li>
      </ul>
    </animated.div>
  )
}
const Topics = () => (
  <ul id="topics" className="text-sm inline-flex whitespace-nowrap gap-1.5">
    <li className="rounded-full px-3 py-1 bg-neutral-900/90 dark:bg-neutral-100 dark:text-black text-white font-medium">
      <button>All</button>
    </li>
    {topics.map((topic) => (
      <li
        key={topic}
        className="rounded-full px-3 py-1 hover:bg-neutral-200/30 hover:opacity-90 whitespace-nowrap opacity-70"
      >
        <button>{topic}</button>
      </li>
    ))}
  </ul>
)
const Menu = ({ openMenu, menuRef, handleMenu, videos }) => {
  const pathname = usePathname()
  const menuSpring = useSpring({
    width: openMenu ? "288px" : "64px",
  })
  const textSpring = useSpring({
    opacity: openMenu ? 1 : 0,
  })
  const handleClick = () => {
    if (openMenu) {
      setTimeout(() => handleMenu(), 600)
    } else {
      null
    }
  }
  return (
    <animated.div
      ref={menuRef}
      style={menuSpring}
      className={`fixed z-20 left-0 top-0 bg-white dark:bg-neutral-800 backdrop-blur-sm shadow  text-sm overflow-hidden hidden sm:block overflow-y-scroll h-full`}
    >
      <ul className="grid border-b dark:border-neutral-700">
        <div
          className={`flex cursor-pointer items-center gap-4  py-2 px-4 ${
            openMenu ? "justify-between" : "justify-start"
          }`}
        >
          <Icon
            onClick={handleMenu}
            className={`-rotate-90 transition-all duration-150 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/90 ${
              openMenu && "rotate-90"
            }`}
          >
            <MenuIcon.DownIcon />
          </Icon>
          {openMenu && (
            <Icon>
              <MenuIcon.SettingsIcon />
            </Icon>
          )}
        </div>
        <Link
          onClick={handleClick}
          href={`/`}
          className={`flex items-center gap-4 hover:bg-neutral-200/90 dark:hover:bg-neutral-700/90  py-2 pl-4 ${
            pathname === "/" &&
            "bg-neutral-200/90 dark:bg-neutral-700/90 font-medium"
          }`}
        >
          {pathname === "/" ? (
            <Icon>
              <MenuIcon.HomeIcon />
            </Icon>
          ) : (
            <Icon>
              <MenuIcon.InactiveHomeIcon />
            </Icon>
          )}
          {openMenu && <animated.p>Home</animated.p>}
        </Link>
        <Link
          onClick={handleClick}
          href={`/shorts`}
          className={`flex hover:bg-neutral-200/90 dark:hover:bg-neutral-700/90 items-center gap-4  py-2 pl-4 ${
            pathname === "/shorts" &&
            "bg-neutral-200/90 dark:bg-neutral-700/90 font-medium"
          }`}
        >
          {pathname === "/shorts" ? (
            <Icon>
              <MenuIcon.ShortsIcon />
            </Icon>
          ) : (
            <Icon>
              <MenuIcon.InactiveShortsIcon />
            </Icon>
          )}
          {openMenu && <animated.p>Shorts</animated.p>}
        </Link>
        <Link
          onClick={handleClick}
          className={`flex hover:bg-neutral-200/90 dark:hover:bg-neutral-700/90 items-center gap-4  py-2 pl-4 ${
            pathname === "/subscriptions" &&
            "bg-neutral-200/90 dark:bg-neutral-700/90 font-medium"
          }`}
          href={`/subscriptions`}
        >
          {pathname === "/subscriptions" ? (
            <Icon>
              <MenuIcon.SubscriptionsIcon />
            </Icon>
          ) : (
            <Icon>
              <MenuIcon.InactiveSubscriptionsIcon />
            </Icon>
          )}
          {openMenu && <animated.p>Subscriptions</animated.p>}
        </Link>
      </ul>
      <ul className="grid border-b dark:border-neutral-700">
        <Link
          className={`flex hover:bg-neutral-200/90 dark:hover:bg-neutral-700/90 items-center gap-4  py-2 pl-4 ${
            pathname === "/library" &&
            "bg-neutral-200/90 dark:bg-neutral-700/90 font-medium"
          }`}
          href={`/library`}
        >
          <Icon>
            <MenuIcon.InactiveLibraryIcon />
          </Icon>
          {openMenu && <animated.p>Library</animated.p>}
        </Link>
        <Link
          href={`/`}
          className={`flex items-center gap-4 hover:bg-neutral-200/90 dark:hover:bg-neutral-700/90  py-2 pl-4 ${
            pathname === "/history" &&
            "bg-neutral-200/90 dark:bg-neutral-700/90 font-medium"
          }`}
        >
          <Icon>
            <MenuIcon.InactiveHistoryIcon />
          </Icon>
          {openMenu && <animated.p>History</animated.p>}
        </Link>
        <Link
          href={`/yourvideos`}
          className={`flex hover:bg-neutral-200/90 dark:hover:bg-neutral-700/90 items-center gap-4  py-2 pl-4 ${
            pathname === "/shorts" &&
            "bg-neutral-200/90 dark:bg-neutral-700/90 font-medium"
          }`}
        >
          {pathname === "/yourvideos" ? (
            <Icon>
              <MenuIcon.ShortsIcon />
            </Icon>
          ) : (
            <Icon>
              <MenuIcon.InactiveYourVideosIcon />
            </Icon>
          )}
          {openMenu && (
            <animated.p className="whitespace-nowrap">Your Videos</animated.p>
          )}
        </Link>
        <Link
          href={`/watchlater`}
          className={`flex hover:bg-neutral-200/90 dark:hover:bg-neutral-700/90 items-center gap-4  py-2 pl-4 ${
            pathname === "/watchlater" &&
            "bg-neutral-200/90 dark:bg-neutral-700/90 font-medium"
          }`}
        >
          <Icon>
            <MenuIcon.InactiveWatchLaterIcon />
          </Icon>
          {openMenu && (
            <animated.p className={`whitespace-nowrap`}>Watch later</animated.p>
          )}
        </Link>
        <Link
          href={`/likedvideos`}
          className="flex items-center gap-4 hover:bg-neutral-200/90 dark:hover:bg-neutral-700/90 py-2 pl-4"
        >
          <Icon>
            <MenuIcon.InactiveLikedVideosIcon />
          </Icon>
          {openMenu && (
            <animated.p className={`whitespace-nowrap`}>
              Liked videos
            </animated.p>
          )}
        </Link>
        {openMenu && (
          <animated.div
            style={textSpring}
            className="flex items-center gap-4 hover:bg-neutral-200/90 dark:hover:bg-neutral-700/90 py-2 pl-4 cursor-pointer"
          >
            <Icon>
              <MenuIcon.DownIcon />
            </Icon>
            {openMenu && <p>Show more</p>}
          </animated.div>
        )}
      </ul>
      <ul className="grid">
        {videos.map((video) => (
          <li
            key={video.id}
            className="flex gap-5 pl-4 w-full py-3 items-center hover:bg-neutral-200/90 dark:hover:bg-neutral-700/90 cursor-pointer"
          >
            <div className="relative">
              <div className="absolute top-0 right-0 rounded-full bg-blue-400 w-2 h-2" />
              <Image
                src={video.avatar}
                width={30}
                height={30}
                alt=""
                className="rounded-full cursor-pointer"
              />
            </div>
            {openMenu && (
              <animated.p className={`absolute left-[68px] whitespace-nowrap`}>
                {video.channel}
              </animated.p>
            )}
          </li>
        ))}
      </ul>
    </animated.div>
  )
}
const topics = [
  "Gaming",
  "Music",
  "Comedy",
  "Beauty and fashion",
  "Food and cooking",
  "Sports",
  "News and politics",
  "Technology",
  "Vlogs",
  "Travel",
  "How-to tutorials",
  "Education",
  "Science and technology",
  "Entertainment",
  "Art and design",
  "Health and fitness",
  "Business and finance",
  "Pets and animals",
  "Cars and motorcycles",
  "Film and animation",
  "Family and parenting",
  "Books and literature",
  "History",
  "Spirituality and religion",
  "Language learning",
]
const Header = ({ videos }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [scrollX, setscrollX] = useState(0)
  const [scrollEnd, setscrollEnd] = useState(false)
  const scrollRef = useRef(null)
  const menuRef = useRef(null)
  const searchRef = useRef(null)
  const pathname = usePathname()

  const handleSearch = () => {
    setOpenSearch(!openSearch)
    !openSearch
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto")
    menuRef.current.style.zIndex = openSearch ? "10" : "1"
    setTimeout(
      () =>
        openSearch ? searchRef.current?.blur() : searchRef.current?.focus(),
      500
    )
  }
  const handleMenu = useCallback(() => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu)
    !openMenu
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto")
  }, [openMenu])
  const slide = (shift) => {
    const scrollLeft = scrollRef.current?.scrollLeft
    const maxScrollLeft =
      scrollRef.current?.scrollWidth - scrollRef.current.offsetWidth

    let targetScrollLeft = scrollLeft + shift
    if (targetScrollLeft < 0) {
      targetScrollLeft = 0
    } else if (targetScrollLeft > maxScrollLeft) {
      targetScrollLeft = maxScrollLeft
    }

    const duration = 500 // in milliseconds
    const startTime = performance.now()
    const endTime = startTime + duration

    const easeInOutQuad = (t) => {
      t /= duration / 2
      if (t < 1) return (shift / 2) * t * t + scrollLeft
      t--
      return (-shift / 2) * (t * (t - 2) - 1) + scrollLeft
    }

    const scroll = (currentTime) => {
      if (currentTime >= endTime) {
        scrollRef.current.scrollLeft = targetScrollLeft
        setscrollX(targetScrollLeft)
        return
      }
      const time = currentTime - startTime
      const newScrollLeft = easeInOutQuad(time)
      scrollRef.current.scrollLeft = newScrollLeft
      setscrollX(newScrollLeft)
      requestAnimationFrame(scroll)
    }

    requestAnimationFrame(scroll)
    setscrollEnd(targetScrollLeft >= maxScrollLeft)
  }
  const scrollCheck = () => {
    setscrollX(scrollRef.current.scrollLeft)
    if (
      Math.floor(
        scrollRef.current.scrollWidth - scrollRef.current.scrollLeft
      ) <= scrollRef.current.offsetWidth
    ) {
      setscrollEnd(true)
    } else {
      setscrollEnd(false)
    }
  }
  useEffect(() => {
    if (
      scrollRef.current &&
      scrollRef?.current?.scrollWidth === scrollRef?.current?.offsetWidth
    ) {
      setscrollEnd(true)
    } else {
      setscrollEnd(false)
    }
    return () => {}
  }, [scrollRef?.current?.scrollWidth, scrollRef?.current?.offsetWidth])

  return (
    <>
      <MenuBackdrop
        onClick={handleMenu}
        className={openMenu ? "opacity-100" : "opacity-0 pointer-events-none"}
      />
      <Menu
        openMenu={openMenu}
        handleMenu={handleMenu}
        menuRef={menuRef}
        videos={videos}
      />
      <Headroom>
        <HeaderContainer>
          <Nav>
            <Logo href={`/`}>
              <Image
                src={`/logo.png`}
                width={110}
                height={110}
                alt="logo"
                className="dark:hidden"
              />
              <Image
                src={`/logo-inverted.png`}
                width={110}
                height={110}
                alt="logo"
                className="hidden dark:block"
              />
            </Logo>
            <Searchbar />
            <Icon className="relative ml-auto">
              <MenuIcon.BellIcon />
              <div className="absolute top-1 right-2 shadow bg-red-500 rounded-full w-2 h-2" />
            </Icon>
            <Icon className=" hidden sm:grid">
              <MenuIcon.CreateIcon />
            </Icon>
            <Icon
              onClick={handleSearch}
              className="hover:bg-neutral-200/50 md:hidden"
            >
              <MenuIcon.SearchIcon />
            </Icon>
            <SearchBackdrop
              style={{
                opacity: openSearch ? 1 : 0,
                pointerEvents: openSearch ? "all" : "none",
              }}
              onClick={handleSearch}
            />
            <SearchDropdown
              openSearch={openSearch}
              searchRef={searchRef}
              setOpenSearch={setOpenSearch}
              handleSearch={handleSearch}
            />
            <Icon className="bg-[#FC0001] text-white hover:bg-red-500">
              <p className="-translate-y-px">c</p>
            </Icon>
          </Nav>
          <LowerNav
            ref={scrollRef}
            onScroll={scrollCheck}
            style={{ display: pathname === "/" ? "block" : "none" }}
          >
            {/* left arrow */}
            {scrollX !== 0 && (
              <div className="fixed bg-gradient-to-r from-white to-transparent dark:from-neutral-900 flex items-center h-[28px] w-[50px] left-0 sm:left-16 transition-all duration-300 ease-in z-10 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() =>
                    slide((scrollRef.current.offsetWidth / 2) * -1)
                  }
                  onDoubleClick={() =>
                    slide(scrollRef.current.offsetWidth * -5)
                  }
                  className="absolute hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 hover:shadow-sm rounded-full p-1 cursor-pointer left-4"
                >
                  <ChevronLeft className="dark:text-neutral-300 text-neutral-700/70" />
                </button>
              </div>
            )}
            <Topics />
            {/* right arrow */}
            {!scrollEnd && (
              <div className="opacity-0 group-hover:opacity-100 fixed dark:from-neutral-900 flex items-center h-[28px]  w-[60px] right-0 bg-gradient-to-l from-white top-[65px] to-transparent transition-opacity duration-300 ease-in">
                <button
                  onClick={() => slide(scrollRef.current.offsetWidth / 2)}
                  onDoubleClick={() => slide(scrollRef.current.offsetWidth * 3)}
                  className="absolute cursor-pointer right-4 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 hover:shadow-sm rounded-full p-1"
                >
                  <ChevronRight className="dark:text-neutral-300 text-neutral-700/70" />
                </button>
              </div>
            )}
          </LowerNav>
        </HeaderContainer>
      </Headroom>
    </>
  )
}

export default Header
