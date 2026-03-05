import type { Metadata } from "next";
import "./globals.css";
import { Tracker } from "@/components/Tracker";

export const metadata: Metadata = {
  title: "Royal Phuket City Hotel — Phuket's Premier MICE Venue",
  description: "Grand Ballroom quy mô lớn + 6 phòng breakout cùng một tầng, kèm công nghệ LED 4K P2 & WiFi 7 cho sự kiện mượt mà tại trung tâm Phố Cổ Phuket.",
  keywords: ["Royal Phuket City Hotel", "MICE Venue", "Phuket", "Hội nghị", "Sự kiện", "Grand Ballroom", "Phố Cổ Phuket"],
  openGraph: {
    title: "Royal Phuket City Hotel — Phuket's Premier MICE Venue",
    description: "Grand Ballroom 1,638 m² sức chứa 2,300 khách. WiFi 7 hỗ trợ 1,800 thiết bị. 251 phòng nghỉ. Bãi đỗ xe 350+ chỗ.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Tracker />
        {children}
      </body>
    </html>
  );
}
