"use client"

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectIfAuthenticated = ({ children }) => {
    const { isAuthenticated } = useSelector((state:any) => state.auth);
    const router = useRouter();

    // useEffect(() => {
    //     if (data.user.role == "admin") {
    //         router.push("/admin");
    //       } else {
    //         router.push("/");
    //       }
    //     if (isAuthenticated) {
    //         router.push("/"); // Redirect authenticated users to the dashboard
    //     }
    // }, [isAuthenticated, router]);

    return isAuthenticated ? null : children; // Render children only if not authenticated
};

export default RedirectIfAuthenticated;
