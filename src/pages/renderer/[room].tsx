import { Logo } from "@components"
import type { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import fs from "fs"
import path from "path"
import { hexToRgbA, rawRgbColorToCss } from "@utils/hexToRgb"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { isDarkOrLightHEX, isDarkOrLightRGBAString, isDarkOrLightRGBAStringD } from "@utils/isDarkOrLight"
import Image from "next/image"
import classNames from "classnames"
import { Mistletoe, Ordaments, Sticker, Flower } from "@components/Background"

const defaultColors = {
  bg: rawRgbColorToCss(hexToRgbA("#FFFFFF")),
  t1: rawRgbColorToCss(hexToRgbA("#D17474")),
  t2: rawRgbColorToCss(hexToRgbA("#E28B8B")),
  c1: rawRgbColorToCss(hexToRgbA("#EBB8B8")),
  c2: rawRgbColorToCss(hexToRgbA("#E49E9E")),
  c3: rawRgbColorToCss(hexToRgbA("#E08484")),
  c4: rawRgbColorToCss(hexToRgbA("#D17474")),
  c5: rawRgbColorToCss(hexToRgbA("#BA5757")),
}

interface ScheduleMeta {
  branch: string
  teacher: string[]
  room: string
  opt: number
}

interface ScheduleBody {
  [key: string]: string[]
}

interface ScheduleData {
  meta: ScheduleMeta
  body: ScheduleBody
  room: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), "_keep/data/1-2566"))

  const paths = files
    .filter((i) => i.includes(".json"))
    .map((s) => ({
      params: { room: s.replace(".json", "") },
    }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const room = params?.room
  let scheduleData: ScheduleData | null = null

  if (params) {
    const raw = fs.readFileSync(path.join(process.cwd(), `_keep/data/1-2566/${room}.json`)).toString()
    scheduleData = JSON.parse(raw)
  }

  return {
    props: {
      scheduleData: { ...scheduleData, room: room },
    },
  }
}

interface RoomProps {
  scheduleData: ScheduleData
  query: any
}

type BGType = "none" | "mistletoe" | "ordaments" | "sticker" | "flower"

const Room = ({ scheduleData }: RoomProps) => {
  const router = useRouter()

  useEffect(() => {
    if (!router.query.colorScheme) {
      return
    }

    if (router.query?.bg) setBackground(router.query.bg as BGType)

    const colorScheme: string = router.query.colorScheme?.toString()
    const parsed = JSON.parse(colorScheme)

    const cssColor: { [k: string]: string } = {}

    Object.keys(parsed).forEach((k) => {
      // @ts-ignore
      cssColor[k] = rawRgbColorToCss(parsed[k])
    })

    // @ts-ignore
    setColor(cssColor)
  }, [router.query.colorScheme])

  const [color, setColor] = useState(defaultColors)
  const [background, setBackground] = useState<BGType>("none")

  const genSchedule = (period: number) => {
    return (
      <>
        {Array(period <= 3 ? 5 : 4)
          .fill("")
          .map((_, i) => {
            const name = period in scheduleData?.body[i + 1] ? scheduleData?.body[i + 1][period][0] : "" ?? ""
            const teacher = period in scheduleData?.body[i + 1] ? scheduleData?.body[i + 1][period][1] : "" ?? ""

            return (
              <div style={{ backgroundColor: color.bg }} className="button" key={i}>
                <div className="text">
                  <strong
                    className="subject"
                    style={{ color: isDarkOrLightRGBAString(color.bg) === "light" ? "#000" : "#fff" }}
                  >
                    {name}
                  </strong>
                  <p
                    className="teacher"
                    style={{ color: isDarkOrLightRGBAString(color.bg) === "light" ? "#a6a8ab" : "#e8e8e8" }}
                  >
                    {teacher?.replace(/\+/g, " ")}
                  </p>
                </div>
              </div>
            )
          })}
      </>
    )
  }

  const Days = [
    {
      name: "จันทร์",
      color: color.c1,
    },
    {
      name: "อังคาร",
      color: color.c2,
    },
    {
      name: "พุธ",
      color: color.c3,
    },
    {
      name: "พฤหัสฯ",
      color: color.c4,
    },
    {
      name: "ศุกร์",
      color: color.c5,
    },
  ]

  return (
    <>
      {/* <div className="absolute top-0 left-0 w-[2388px] h-[1668px] opacity-20 z-20">
        <Image src="/ref.png" width={2388} height={1668} />
      </div> */}
      <div style={{ backgroundColor: color.bg }}>
        <div style={{ backgroundColor: color.bg }} className="wrapper">
          {background === "mistletoe" && <Mistletoe />}
          {background === "ordaments" && <Ordaments color={color.c1} />}
          {background === "sticker" && <Sticker />}
          {background === "flower" && <Flower />}
          <div className="header">
            <div className="left">
              {/*<div className="bar"></div>*/}
              <div className="title-container">
                <h1 className="title" style={{ color: color.t1 }}>
                  ตารางเรียน
                </h1>
                <p className="subtitle" style={{ color: color.t2 }}>
                  ภาคเรียนที่ 1/2566
                </p>
              </div>
            </div>
            <div className="right">
              <h2 className="room" style={{ color: color.t2 }}>
                ห้อง {scheduleData.room} | {scheduleData.meta.branch}
              </h2>
              <div className="teacher" style={{ color: color.t2 }}>
                {scheduleData.meta.teacher.map((teacher) => (
                  <p className="text" key={teacher}>
                    {teacher}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="main">
            <div className="days">
              {Days.map((day) => (
                <div className={classNames("day", day.name === "ศุกร์" && "friday")} key={day.name}>
                  <div
                    className="button"
                    style={{
                      backgroundColor: day.color,
                      color: isDarkOrLightRGBAStringD(day.color) === "light" ? "#444" : "#fff",
                    }}
                  >
                    {day.name}
                  </div>
                  <div className="line" style={{ backgroundColor: day.color }}></div>
                </div>
              ))}
            </div>
            <div className="schedules">
              <div className="mon-to-thurs">
                {/* 1 */}
                <div className="col">
                  <div
                    className="time"
                    style={{ color: isDarkOrLightRGBAString(color.bg) === "light" ? "#404040" : "#eee" }}
                  >
                    07.50-08.40
                  </div>
                  {genSchedule(1)}
                </div>
                {/* 2 */}
                <div className="col">
                  <div
                    className="time"
                    style={{ color: isDarkOrLightRGBAString(color.bg) === "light" ? "#404040" : "#eee" }}
                  >
                    08.40-09.30
                  </div>
                  {genSchedule(2)}
                </div>
                {/* break10 */}
                <div className="col">
                  <div style={{ backgroundColor: color.bg }} className="break10-button">
                    <p className="text">พัก</p>
                    <p className="text">10</p>
                    <p className="text">นาที</p>
                  </div>
                </div>
                {/* 3 */}
                <div className="col">
                  <div
                    className="time"
                    style={{ color: isDarkOrLightRGBAString(color.bg) === "light" ? "#404040" : "#eee" }}
                  >
                    09.40-10.30
                  </div>
                  {genSchedule(3)}
                </div>
                {/* 4 */}
                <div className="col">
                  <div
                    className="time"
                    style={{ color: isDarkOrLightRGBAString(color.bg) === "light" ? "#404040" : "#eee" }}
                  >
                    10.30-11.20
                  </div>
                  {genSchedule(4)}
                </div>
                {/* lunchbreak */}
                <div className="col">
                  <div style={{ backgroundColor: color.bg }} className="lunch-button no-afternoon">
                    <p className="text">พัก</p>
                    <p className="text">กลาง</p>
                    <p className="text">วัน</p>
                  </div>
                </div>
                {/* 5 */}
                <div className="col">
                  <div
                    className="time"
                    style={{ color: isDarkOrLightRGBAString(color.bg) === "light" ? "#404040" : "#eee" }}
                  >
                    12.20-13.10
                  </div>
                  {genSchedule(5)}
                </div>
                {/* 6 */}
                <div className="col">
                  <div
                    className="time"
                    style={{ color: isDarkOrLightRGBAString(color.bg) === "light" ? "#404040" : "#eee" }}
                  >
                    13.10-14.00
                  </div>
                  {genSchedule(6)}
                </div>
                {/* break10 */}
                <div className="col">
                  <div style={{ backgroundColor: color.bg }} className="break10-button no-afternoon">
                    <p className="text">พัก</p>
                    <p className="text">10</p>
                    <p className="text">นาที</p>
                  </div>
                </div>
                {/* 7 */}
                <div className="col">
                  <div
                    className="time"
                    style={{ color: isDarkOrLightRGBAString(color.bg) === "light" ? "#404040" : "#eee" }}
                  >
                    14.10-15.00
                  </div>
                  {genSchedule(7)}
                </div>
                {/* 8 */}
                <div className="col">
                  <div
                    className="time"
                    style={{ color: isDarkOrLightRGBAString(color.bg) === "light" ? "#404040" : "#eee" }}
                  >
                    15.00-15.50
                  </div>
                  {genSchedule(8)}
                </div>
              </div>
              {/*
              <div className="fri">
                <div className="button">
                  <p className="text">เรียนวิชารักษาดินแดน</p>
                </div>
              </div>
              */}
            </div>
          </div>
          <Logo color={color.t1} />
        </div>
      </div>
    </>
  )
}

export default Room
