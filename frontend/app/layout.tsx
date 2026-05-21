import {THEME_COLORS} from "@/app/constants/colors";
import React from "react";
import {ViewProvider} from "@/context/ViewContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body style={{ backgroundColor: THEME_COLORS.canvas }}>
        <ViewProvider>
            <div className="max-w-6xl mx-auto p-8">
                {children}
            </div>
        </ViewProvider>
        </body>
        </html>
    );
}