import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "./TokenManager";

interface Props {
    children: ReactNode
}

function RouteGuard({ children }: Props) {
    return verifyToken() ? (
        <>{children}</>
    ) : (
        <Navigate
            to="/login"
            replace={true}
        />
    )
}
export default RouteGuard;